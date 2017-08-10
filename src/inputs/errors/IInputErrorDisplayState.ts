import { IInput } from '../IInput';

export interface IInputErrorDisplayState {
  shouldShowErrors: boolean;
  changed(input: IInput): IInputErrorDisplayState;
  blurred(input: IInput): IInputErrorDisplayState;
}
