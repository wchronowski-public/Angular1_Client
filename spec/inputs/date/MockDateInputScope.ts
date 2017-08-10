import { expect } from 'chai';
import { IDateInputScope } from '../../../src/inputs/date/DateInputController';
import { DateInput } from '../../../src/inputs/date/DateInput';

export class MockDateInputScope implements IDateInputScope {
  public model: DateInput;

  private dayWasFocused = false;
  private yearWasFocused = false;

  public withModel(model: DateInput): this {
    this.model = model;
    return this;
  }

  public focusDay(): void {
    this.dayWasFocused = true;
  }

  public focusYear(): void {
    this.yearWasFocused = true;
  }

  public verifyDayWasFocused(): void {
    expect(this.dayWasFocused).to.equal(true);
  }

  public verifyDayWasNotFocused(): void {
    expect(this.dayWasFocused).to.equal(false);
  }

  public verifyYearWasFocused(): void {
    expect(this.yearWasFocused).to.equal(true);
  }

  public verifyYearWasNotFocused(): void {
    expect(this.yearWasFocused).to.equal(false);
  }
}
