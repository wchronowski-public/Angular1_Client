import { IInput } from '../IInput';

export interface IInputErrorDisplayFSM {
  changed(input: IInput): IInputErrorDisplayFSM;
  blurred(input: IInput): IInputErrorDisplayFSM;
  shouldShowErrors(): boolean;
}
