export type ValidateCallback = () => void;

export interface IDateInputErrorDisplayState {
  shouldShowErrors(): boolean;
  monthBlurred(callback: ValidateCallback): IDateInputErrorDisplayState;
  dayBlurred(callback: ValidateCallback): IDateInputErrorDisplayState;
  yearBlurred(callback: ValidateCallback): IDateInputErrorDisplayState;
}
