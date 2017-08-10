import * as TypeMoq from 'typemoq';
import { AgentDefaultsResult } from './../../src/defaults/AgentDefaultsResult';
import { AgentDefaults } from './../../src/defaults/AgentDefaults';
import { IAgentDefaultsService } from './../../src/defaults/IAgentDefaultsService';

export class MockAgentDefaultsService implements IAgentDefaultsService {
  private mock: TypeMoq.Mock<IAgentDefaultsService>;

  constructor() {
    this.mock = TypeMoq.Mock.ofInstance(this);
  }

  public loadDefaults(agentNumber: string): Promise<AgentDefaultsResult> {
    return this.mock.object.loadDefaults(agentNumber);
  }

  public upsertDefaults(agentDefaults: AgentDefaults): Promise<AgentDefaultsResult> {
    return this.mock.object.upsertDefaults(agentDefaults);
  }

  public stubLoadDefaultsReturns(agentDefaultsResult: AgentDefaultsResult): this {
    const returnValue: Promise<AgentDefaultsResult> = Promise.resolve(agentDefaultsResult);
    const matcher = TypeMoq.It.is<string>(_ => true);
    this.mock.setup(m => m.loadDefaults(matcher)).returns(() => returnValue);
    return this;
  }

  public stubUpsertDefaultsReturns(agentDefaultsResult: AgentDefaultsResult): this {
    const returnValue: Promise<AgentDefaultsResult> = Promise.resolve(agentDefaultsResult);
    const matcher = TypeMoq.It.is<AgentDefaults>(_ => true);
    this.mock.setup(m => m.upsertDefaults(matcher)).returns(() => returnValue);
    return this;
  }

  public verifyLoadDefaultsCalled(agentNumber: string): void {
    this.mock.verify(m => m.loadDefaults(TypeMoq.It.isValue(agentNumber)), TypeMoq.Times.once());
  }

  public verifyUpsertDefaultsCalled(agentDefaults: AgentDefaults): void {
    this.mock.verify(m => m.upsertDefaults(TypeMoq.It.isValue(agentDefaults)), TypeMoq.Times.once());
  }

  public verifyUpsertDefaultsNotCalled(agentDefaults: AgentDefaults): void {
    this.mock.verify(m => m.upsertDefaults(TypeMoq.It.isValue(agentDefaults)), TypeMoq.Times.never());
  }
}
