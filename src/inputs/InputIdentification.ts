import { IInputIdentification } from './IInputIdentification';

export class InputIdentification implements IInputIdentification {
  public toId(value: string): string {
    return (value || '').split('.').filter(this.isValid).pop() || '';
  }

  private isValid(value: string): boolean {
    return value.trim().length > 0;
  }
}
