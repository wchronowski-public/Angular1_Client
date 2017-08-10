import { expect } from 'chai';
import { DateInputErrorDisplayFsm } from '../../../src/inputs/date/DateInputErrorDisplayFsm';
import { MockValidateCallback } from './MockValidateCallback';

function stateDescription(initialStates: string[]): string {
  if (initialStates.length === 0) {
    return 'empty state';
  }

  return initialStates.join(', ');
}

function eventsDescription(eventNames: string[]): string {
  return eventNames.filter(name => {
    return name !== 'validated'
        && name !== 'notValidated'
        && name !== 'showingErrors'
        && name !== 'notShowingErrors';
  }).join(', ');
}

function buildDateInputFsm(initialStates: string[]): DateInputErrorDisplayFsm {
  const initialState = {
    monthHasValue: () => false,
    dayHasValue: () => false,
    yearHasValue: () => false,
  };

  initialStates.forEach(initialStateMarker => {
    switch (initialStateMarker) {
      case 'monthHasValue':
        initialState.monthHasValue = () => true;
        break;
      case 'dayHasValue':
        initialState.dayHasValue = () => true;
        break;
      case 'yearHasValue':
        initialState.yearHasValue = () => true;
        break;
      default:
        throw new Error(`Unsupported initial state: ${initialStateMarker}`);
    }
  });

  return DateInputErrorDisplayFsm.build(initialState);
}

function trigger(fsm: DateInputErrorDisplayFsm, mockValidateCallback: MockValidateCallback, eventName: string): DateInputErrorDisplayFsm {
  switch(eventName) {
    case 'monthBlurred':
      return fsm.monthBlurred(mockValidateCallback.getCallback());
    case 'dayBlurred':
      return fsm.dayBlurred(mockValidateCallback.getCallback());
    case 'yearBlurred':
      return fsm.yearBlurred(mockValidateCallback.getCallback());
    default:
      throw new Error(`Unsupported event name: ${eventName}`);
  }
}

describe('DateInputErrorDisplayFsm', () => {
  [
    [[], ['notShowingErrors']],
    [[], ['monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'notShowingErrors', 'notValidated']],

    [[], ['monthBlurred', 'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'yearBlurred',  'notShowingErrors', 'notValidated']],

    [[], ['monthBlurred', 'monthBlurred', 'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'monthBlurred', 'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'monthBlurred', 'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'dayBlurred',   'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'dayBlurred',   'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'dayBlurred',   'yearBlurred',  'showingErrors'   , 'validated']],
    [[], ['monthBlurred', 'yearBlurred',  'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['monthBlurred', 'yearBlurred',  'dayBlurred',   'showingErrors'   , 'validated']],
    [[], ['monthBlurred', 'yearBlurred',  'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'monthBlurred', 'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'monthBlurred', 'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'monthBlurred', 'yearBlurred',  'showingErrors'   , 'validated']],
    [[], ['dayBlurred',   'dayBlurred',   'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'dayBlurred',   'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'dayBlurred',   'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'yearBlurred',  'monthBlurred', 'showingErrors'   , 'validated']],
    [[], ['dayBlurred',   'yearBlurred',  'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['dayBlurred',   'yearBlurred',  'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'monthBlurred', 'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'monthBlurred', 'dayBlurred',   'showingErrors'   , 'validated']],
    [[], ['yearBlurred',  'monthBlurred', 'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'dayBlurred',   'monthBlurred', 'showingErrors'   , 'validated']],
    [[], ['yearBlurred',  'dayBlurred',   'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'dayBlurred',   'yearBlurred',  'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'yearBlurred',  'monthBlurred', 'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'yearBlurred',  'dayBlurred',   'notShowingErrors', 'notValidated']],
    [[], ['yearBlurred',  'yearBlurred',  'yearBlurred',  'notShowingErrors', 'notValidated']],

    [[], ['monthBlurred', 'dayBlurred',   'yearBlurred',  'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['monthBlurred', 'dayBlurred',   'yearBlurred',  'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['monthBlurred', 'dayBlurred',   'yearBlurred',  'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],
    [[], ['monthBlurred', 'yearBlurred',  'dayBlurred',   'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['monthBlurred', 'yearBlurred',  'dayBlurred',   'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['monthBlurred', 'yearBlurred',  'dayBlurred',   'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],
    [[], ['dayBlurred',   'monthBlurred', 'yearBlurred',  'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['dayBlurred',   'monthBlurred', 'yearBlurred',  'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['dayBlurred',   'monthBlurred', 'yearBlurred',  'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],
    [[], ['dayBlurred',   'yearBlurred',  'monthBlurred', 'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['dayBlurred',   'yearBlurred',  'monthBlurred', 'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['dayBlurred',   'yearBlurred',  'monthBlurred', 'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],
    [[], ['yearBlurred',  'monthBlurred', 'dayBlurred',   'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['yearBlurred',  'monthBlurred', 'dayBlurred',   'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['yearBlurred',  'monthBlurred', 'dayBlurred',   'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],
    [[], ['yearBlurred',  'dayBlurred',   'monthBlurred', 'showingErrors', 'validated', 'monthBlurred', 'showingErrors', 'validated']],
    [[], ['yearBlurred',  'dayBlurred',   'monthBlurred', 'showingErrors', 'validated', 'dayBlurred',   'showingErrors', 'validated']],
    [[], ['yearBlurred',  'dayBlurred',   'monthBlurred', 'showingErrors', 'validated', 'yearBlurred',  'showingErrors', 'validated']],

    [['monthHasValue'],                                ['dayBlurred', 'yearBlurred', 'showingErrors', 'validated']],
    [['monthHasValue', 'dayHasValue'],                 ['yearBlurred', 'showingErrors', 'validated']],
    [['monthHasValue', 'yearHasValue'],                ['dayBlurred', 'showingErrors', 'validated']],
    [['dayHasValue'],                                  ['monthBlurred', 'yearBlurred', 'showingErrors', 'validated']],
    [['dayHasValue', 'yearHasValue'],                  ['monthBlurred', 'showingErrors', 'validated']],
    [['yearHasValue'],                                 ['monthBlurred', 'dayBlurred', 'showingErrors', 'validated']],
    [['monthHasValue', 'dayHasValue', 'yearHasValue'], ['showingErrors', 'notValidated', 'yearBlurred', 'showingErrors', 'validated']],
  ].forEach(args => {
    const [initialState, eventSequence] = args;
    it(`starting in the ${stateDescription(initialState)}, runs ${eventsDescription(eventSequence)}`, () => {
      let callback = new MockValidateCallback();
      let fsm = buildDateInputFsm(initialState);
      eventSequence.forEach(eventName => {
        switch(eventName) {
          case 'validated':
            expect(callback.wasValidated).to.be.true;
            break;
          case 'notValidated':
            expect(callback.wasValidated).to.be.false;
            break;
          case 'notShowingErrors':
            expect(fsm.shouldShowErrors()).to.equal(false);
            break;
          case 'showingErrors':
            expect(fsm.shouldShowErrors()).to.equal(true);
            break;
          default:
            callback = new MockValidateCallback();
            fsm = trigger(fsm, callback, eventName);
            break;
        }
      });
    });
  });
});
