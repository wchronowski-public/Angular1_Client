import { Mock, Times } from 'typemoq';
import { IAgentDefaultsRouter } from '../../src/defaults/IAgentDefaultsRouter';
import { setImmediateAsync } from '../../src/util/Promise';

export class MockAgentDefaultsRouter implements IAgentDefaultsRouter {
  private mock: Mock<IAgentDefaultsRouter> = Mock.ofInstance(this);

  public constructor() {
    this.mock.setup(m => m.navigateToAgentDefaultsShow()).returns(() => Promise.resolve(this));
    this.mock.setup(m => m.navigateToAgentDefaultsEdit()).returns(() => Promise.resolve(this));
  }

  public navigateToAgentDefaultsShow(): Promise<this> {
    return setImmediateAsync(() => this.mock.object.navigateToAgentDefaultsShow());
  }

  public verifyNavigatedToAgentDefaultsShow(): void {
    this.mock.verify(m => m.navigateToAgentDefaultsShow(), Times.once());
  }

  public verifyDidNotNavigateToAgentDefaultsShow(): void {
    this.mock.verify(m => m.navigateToAgentDefaultsShow(), Times.never());
  }

  public navigateToAgentDefaultsEdit(): Promise<this> {
    return setImmediateAsync(() => this.mock.object.navigateToAgentDefaultsEdit());
  }

  public verifyNavigatedToAgentDefaultsEdit(): void {
    this.mock.verify(m => m.navigateToAgentDefaultsEdit(), Times.once());
  }

  public verifyDidNotNavigateToAgentDefaultsEdit(): void {
    this.mock.verify(m => m.navigateToAgentDefaultsEdit(), Times.never());
  }
}
