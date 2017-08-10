import { expect } from 'chai';
import { AgentDefaultsService } from './../../src/defaults/AgentDefaultsService';
import { mapJsonToDefaults } from './../../src/defaults/AgentDefaultsJson';
import { HttpStatusCode } from '../../src/http/HttpStatusCode';
import { MockHttpClient } from '../http/MockHttpClient';
import { buildPopulateAgentDefaultsJson } from './BuildPopulateAgentDefaultsJson';

describe('AgentDefaultsService', () => {
  context('loads the agent defaults', () => {
    it('makes a request to load agent defaults endpoint', () => {
      const json = JSON.stringify({
        data: buildPopulateAgentDefaultsJson(),
      });
      const response = { statusCode: HttpStatusCode.Ok, body: json};
      const httpClient = new MockHttpClient().withGetStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return service.loadDefaults('A000123').then(() => {
        httpClient.verifyMadeGetRequest('/api/v1/defaults/A000123');
      });
    });

    it('returns a sucessful default result', () => {
      const defaultsJson = buildPopulateAgentDefaultsJson();
      const json = JSON.stringify({
        data: defaultsJson,
      });
      const response = { statusCode: HttpStatusCode.Ok, body: json};
      const httpClient = new MockHttpClient().withGetStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return service.loadDefaults('A000123').then(result => {
        expect(result.getDefaults().hasValue()).to.be.true;
        const defaults = result.getDefaults().get();
        expect(defaults).to.eql(mapJsonToDefaults(defaultsJson));
      });
    });

    it('returns a defaults not found result when the api returns a 404', () => {
      const response = { statusCode: HttpStatusCode.NotFound};
      const httpClient = new MockHttpClient().withGetStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return service.loadDefaults('A000123').then(result => {
        expect(result.getDefaults().hasValue()).to.be.false;
      });
    });

    it('rejects the promise when the api returns an error', () => {
      const response = { statusCode: HttpStatusCode.InternalServerError};
      const httpClient = new MockHttpClient().withGetStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return expect(service.loadDefaults('A000123')).to.be.rejected;
    });
  });

  context('upsert agent defaults', () => {
    it('makes a request to put agent defaults endpoint', () => {
      const defaultsJson = buildPopulateAgentDefaultsJson();
      const json = JSON.stringify({
        data: defaultsJson,
      });
      const response = { statusCode: HttpStatusCode.Created, body: json};
      const httpClient = new MockHttpClient().withPutStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return service.upsertDefaults(mapJsonToDefaults(defaultsJson)).then(result => {
        httpClient.verifyMadePutRequest('/api/v1/defaults/A000123', defaultsJson);
        expect(result.getDefaults().hasValue()).to.be.true;

        const defaults = result.getDefaults().get();
        expect(defaults).to.eql(mapJsonToDefaults(defaultsJson));
      });
    });
    it('rejects the promise when the api returns an error', () => {
      const defaultsJson = buildPopulateAgentDefaultsJson();
      const response = { statusCode: HttpStatusCode.InternalServerError};
      const httpClient = new MockHttpClient().withPostStubbedToReturn(response);
      const service = new AgentDefaultsService(httpClient);

      return expect(service.upsertDefaults(mapJsonToDefaults(defaultsJson))).to.be.rejected;
    });
  });
});
