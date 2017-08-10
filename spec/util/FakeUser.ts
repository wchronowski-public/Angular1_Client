import { IUser } from '../../src/auth/IUser';

export class FakeUser implements IUser {
  public name: string = 'Fake User';
  public agencyNumber: string = 'A00001';
  public canSubmitQuote: boolean = true;
}
