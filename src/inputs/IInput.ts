export interface IInput {
  blurred(): void;
  changed(): void;
  hasValue(): boolean;
  shouldShowErrors(): boolean;
  validate(): void;
  isValid(): boolean;
}
