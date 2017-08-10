import { Inject } from 'src/util/Inject';
import { HTTP_CLIENT } from 'src/http/IHttpClient';
import { IAgentDefaultsService } from './IAgentDefaultsService';
import { IHttpResponse } from './../http/IHttpResponse';
import { IHttpClient } from './../http/IHttpClient';
import { HttpStatusCode } from './../http/HttpStatusCode';
import { AgentDefaultsResult } from './AgentDefaultsResult';
import { mapJsonToDefaults } from './AgentDefaultsJson';
import { AgentDefaults } from './AgentDefaults';
import { mapDefaultsToJson } from './../defaults/AgentDefaultsJson';

@Inject(HTTP_CLIENT)
export class AgentDefaultsService implements IAgentDefaultsService {
  private httpClient: IHttpClient;
  private UNSUPPORTED_RESPONSE = 'unsupported response from server';

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  public loadDefaults(agencyNumber: string): Promise<AgentDefaultsResult> {
    const path = `/api/v1/defaults/${agencyNumber}`;
    return this.httpClient.get(path).then(this.returnLoadDefaultsResult.bind(this));
  }

  public upsertDefaults(agentDefaults: AgentDefaults): Promise<AgentDefaultsResult> {
    const path = `/api/v1/defaults/${agentDefaults.agencyNumber}`;
    return this.httpClient.put(path, mapDefaultsToJson(agentDefaults))
      .then(this.returnUpsertDefaultsResult.bind(this));
  }

  private returnLoadDefaultsResult(response: IHttpResponse): AgentDefaultsResult {
    if (response.statusCode === HttpStatusCode.NotFound) {
      return AgentDefaultsResult.defaultsNotFound();
    }

    if (response.statusCode === HttpStatusCode.Ok) {
      const defaults = this.getDefaultsFromResponse(response.body);
      return AgentDefaultsResult.success(defaults);
    }

    throw new Error(this.UNSUPPORTED_RESPONSE);
  }

  private returnUpsertDefaultsResult(response: IHttpResponse): AgentDefaultsResult {
    if (response.statusCode === HttpStatusCode.Created || response.statusCode === HttpStatusCode.Ok) {
        const defaults = this.getDefaultsFromResponse(response.body);
        return AgentDefaultsResult.success(defaults);
    }

    throw new Error(this.UNSUPPORTED_RESPONSE);
  }

  private getDefaultsFromResponse(responseBody: string): AgentDefaults {
    const json = JSON.parse(responseBody);
    return  mapJsonToDefaults(json.data);
  }

}
