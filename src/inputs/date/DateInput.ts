import { IDateInputState } from './IDateInputState';

export class DateInput implements IDateInputState {
  private static numberRegex = new RegExp('^[0-9]+$');

  public month: string = null;
  public day: string = null;
  public year: string = null;

  public static fromStrings(year: string, month: string, day: string): DateInput {
    const input = new DateInput();
    input.year = year;
    if(month && month.length === 1) {
      input.month = '0' + month;
    } else {
      input.month = month;
    }
    if(day && day.length === 1) {
      input.day = '0' + day;
    } else {
      input.day = day;
    }
    return input;
  }

  public static fromDate(date: Date): DateInput {
    if(!date) {
      return new DateInput();
    } else {
      const month = (date.getUTCMonth() + 1).toString();
      const day = date.getUTCDate().toString();
      const year = date.getUTCFullYear().toString();
      return DateInput.fromStrings(year, month, day);
    }
  }

  public setTo(date: Date): void {
    const i = DateInput.fromDate(date);
    this.month = i.month;
    this.day = i.day;
    this.year = i.year;
  }

  public hasValue(): boolean {
    return this.monthHasValue() && this.dayHasValue() && this.yearHasValue();
  }

  public monthHasValue(): boolean {
    return this.stringHasValue(this.month);
  }

  public dayHasValue(): boolean {
    return this.stringHasValue(this.day);
  }

  public yearHasValue(): boolean {
    return this.stringHasValue(this.year);
  }

  public toDate(): Date {
    const parsedYear = this.parseAsBaseTenInteger(this.year);
    const minimumYear = 1900;
    if (!parsedYear) {
      return null;
    }

    if (parsedYear < minimumYear) {
      return null;
    }

    const parsedMonth = this.parseAsBaseTenInteger(this.month);
    if (!parsedMonth) {
      return null;
    }
    const zeroIndexedMonth = parsedMonth - 1;

    const parsedDay = this.parseAsBaseTenInteger(this.day);
    if (!parsedDay) {
      return null;
    }

    const parsedDate = new Date(Date.UTC(parsedYear, zeroIndexedMonth, parsedDay, 0, 0, 0, 0));

    if (parsedDate.getUTCFullYear() !== parsedYear) {
      return null;
    }

    if (parsedDate.getUTCMonth() !== zeroIndexedMonth) {
      return null;
    }

    if (parsedDate.getUTCDate() !== parsedDay) {
      return null;
    }

    return parsedDate;
  }

  private stringHasValue(input: string): boolean {
    return !!input;
  }

  private parseAsBaseTenInteger(input: string): number {
    if (!this.stringHasValue(input)) {
      return null;
    }

    input = input.trim();

    if(!DateInput.numberRegex.test(input)) {
      return null;
    }

    return parseInt(input, 10);
  }
}
