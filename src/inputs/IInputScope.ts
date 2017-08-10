import { IInputContext } from './IInputContext';

export interface IInputScope<T> {
  model: T;
  context?: IInputContext;
  onChange?: () => void;
  errors?: string[];
}
