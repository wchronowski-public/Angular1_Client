import { ZipCode } from './ZipCode';
import { Address } from './Address';
import { ZipCodeBuilder } from './ZipCodeBuilder';
import { StateTerritory } from './StateTerritory';

export class AddressBuilder {
  private address1: string = null;
  private address2: string = null;
  private city: string = null;
  private state: StateTerritory = null;
  private zipCode: ZipCode = new ZipCodeBuilder().build();
  private county: string = null;

  public constructor(address?: Address) {
    if(address) {
      this.address1 = address.address1;
      this.address2 = address.address2;
      this.city = address.city;
      this.state = address.state;
      this.zipCode = address.zipCode;
      this.county = address.county;
    }
  }

  public setAddress1(address1: string): this {
    this.address1 = address1;
    return this;
  }

  public setAddress2(address2: string): this {
    this.address2 = address2;
    return this;
  }

  public setCity(city: string): this {
    this.city = city;
    return this;
  }

  public setState(state: StateTerritory): this {
    this.state = state;
    return this;
  }

  public removeState(): this {
    this.state = null;
    return this;
  }

  public setZipCode(zipCode: ZipCode): this {
    this.zipCode = zipCode;
    return this;
  }

  public updateZipCode(f: Func<ZipCodeBuilder, void>): this {
    const builder = new ZipCodeBuilder(this.zipCode);
    f(builder);
    this.zipCode = builder.build();
    return this;
  }

  public setCounty(county: string): this {
    this.county = county;
    return this;
  }

  public build(): Address {
    return {
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      county: this.county,
    };
  }
}
