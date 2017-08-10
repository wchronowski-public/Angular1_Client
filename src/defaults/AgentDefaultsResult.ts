import { AgentDefaults } from './AgentDefaults';
import { Optional } from '../util/Optional';

export enum Status {
  Success,
  NotFound
}

export class AgentDefaultsResult {
  public static success(defaults: AgentDefaults): AgentDefaultsResult {
    return new AgentDefaultsResult(Status.Success, defaults);
  }

  public static defaultsNotFound(): AgentDefaultsResult {
    return new AgentDefaultsResult(Status.NotFound);
  }

  private constructor(private status: Status, private defaults?: AgentDefaults) {}

  public getDefaults(): Optional<AgentDefaults> {
    return this.status === Status.Success ? Optional.of(this.defaults) : Optional.none<AgentDefaults>();
  }
}
