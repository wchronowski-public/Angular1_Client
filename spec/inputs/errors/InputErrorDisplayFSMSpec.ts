import { expect } from 'chai';
import { InputErrorDisplayFSM } from '../../../src/inputs/errors/InputErrorDisplayFSM';
import { MockInput } from '../MockInput';
import { NeverHadValueState } from '../../../src/inputs/errors/NeverHadValueState';
import { HasValueShowingErrorsState } from '../../../src/inputs/errors/HasValueShowingErrorsState';
import { NoValueShowingErrorsState } from '../../../src/inputs/errors/NoValueShowingErrorsState';

describe('InputErrorDisplayFSM', () => {
  it('starts in the never had value state when the input does not have a value', () => {
    const input = new MockInput().stubbedToNotHaveValue();
    const fsm = InputErrorDisplayFSM.fromInput(input);

    expect(fsm.currentState).to.be.an.instanceOf(NeverHadValueState);
  });

  it('starts in the has value showing errors state when the input has a value', () => {
    const input = new MockInput().stubbedToHaveValue();
    const fsm = InputErrorDisplayFSM.fromInput(input);

    expect(fsm.currentState).to.be.an.instanceOf(HasValueShowingErrorsState);
  });

  context('when in the never had value state', () => {
    const initialFsm = new InputErrorDisplayFSM(new NeverHadValueState());

    context('when changed', () => {
      it('remains in the never had value state when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(NeverHadValueState);
      });

      it('does not validate when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        initialFsm.changed(input);

        input.verifyWasNotValidated();
      });

      it('enters the has value showing errors state when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(HasValueShowingErrorsState);
      });

      it('validates when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        initialFsm.changed(input);

        input.verifyWasValidated();
      });
    });

    context('when blurred', () => {
      it('enters the no value showing errors state', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        const fsm = initialFsm.blurred(input);

        expect(fsm.currentState).to.be.an.instanceOf(NoValueShowingErrorsState);
      });

      it('validates', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        initialFsm.blurred(input);

        input.verifyWasValidated();
      });
    });
  });

  context('when in the no value showing errors state', () => {
    const initialFsm = new InputErrorDisplayFSM(new NoValueShowingErrorsState());

    context('when changed', () => {
      it('remains in the no value showing errors state when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(NoValueShowingErrorsState);
      });

      it('does not validate when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        initialFsm.changed(input);

        input.verifyWasNotValidated();
      });

      it('enters the has value showing errors state when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(HasValueShowingErrorsState);
      });

      it('validates when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        initialFsm.changed(input);

        input.verifyWasValidated();
      });
    });

    context('when blurred', () => {
      it('remains in the no value showing errors state', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        const fsm = initialFsm.blurred(input);

        expect(fsm.currentState).to.be.an.instanceOf(NoValueShowingErrorsState);
      });

      it('does not validate', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        initialFsm.blurred(input);

        input.verifyWasNotValidated();
      });
    });
  });

  context('when in the has value showing errors state', () => {
    const initialFsm = new InputErrorDisplayFSM(new HasValueShowingErrorsState());

    context('when changed', () => {
      it('remains in the has value showing errors state when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(HasValueShowingErrorsState);
      });

      it('validates when the input has a value', () => {
        const input = new MockInput().stubbedToHaveValue();
        initialFsm.changed(input);

        input.verifyWasValidated();
      });

      it('enters the no value showing errors state when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        const fsm = initialFsm.changed(input);

        expect(fsm.currentState).to.be.an.instanceOf(NoValueShowingErrorsState);
      });

      it('validates when the input does not have a value', () => {
        const input = new MockInput().stubbedToNotHaveValue();
        initialFsm.changed(input);

        input.verifyWasValidated();
      });
    });

    context('when blurred', () => {
      it('remains in the no value showing errors state', () => {
        const input = new MockInput().stubbedToHaveValue();
        const fsm = initialFsm.blurred(input);

        expect(fsm.currentState).to.be.an.instanceOf(HasValueShowingErrorsState);
      });

      it('does not validate', () => {
        const input = new MockInput().stubbedToHaveValue();
        initialFsm.blurred(input);

        input.verifyWasNotValidated();
      });
    });
  });
});
