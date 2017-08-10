import { expect } from 'chai';
import { Confirmation } from '../../src/util/confirmations/Confirmation';

describe('Confirmation', () => {
  it('shows a confirmation message', () => {
    const confirmation = new Confirmation({
      message: 'Test Message',
      action: (): void => (null),
    });

    expect(confirmation.message).to.equal('Test Message');
  });

  it('waits for activation', () => {
    const confirmation = new Confirmation({
      message: 'Test Message',
      action: (): void => (null),
    });

    expect(confirmation.isActive()).to.equal(false);

    confirmation.activate();

    expect(confirmation.isActive()).to.equal(true);
  });

  it('confirms an action', () => {
    let x = 0;
    const confirmation = new Confirmation({
      message: 'Confirm increment x?',
      action: (): void => (x = x + 1, null),
    });
    confirmation.activate();

    confirmation.confirm();

    expect(x).to.equal(1);
    expect(confirmation.isActive()).to.equal(false);
  });

  it('cancels an action', () => {
    let x = 0;
    const confirmation = new Confirmation({
      message: 'Confirm increment x?',
      action: (): void => (x = x + 1, null),
    });
    confirmation.activate();

    confirmation.cancel();

    expect(x).equal(0);
    expect(confirmation.isActive()).to.equal(false);
  });
});
