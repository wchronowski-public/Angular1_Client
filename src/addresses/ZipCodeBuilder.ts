import { ZipCode } from './ZipCode';

export class ZipCodeBuilder {
  private baseValue: string = null;
  private extendedValue: string = null;

  public constructor(zip?: ZipCode) {
    if(zip) {
      this.baseValue = zip.baseValue;
      this.extendedValue = zip.extendedValue;
    }
  }

  public setBaseValue(baseValue: string): this {
    this.baseValue = baseValue;
    return this;
  }

  public setExtendedValue(extendedValue: string): this {
    this.extendedValue = extendedValue;
    return this;
  }

  public build(): ZipCode {
    return {
      baseValue: this.baseValue,
      extendedValue: this.extendedValue,
    };
  }
}
