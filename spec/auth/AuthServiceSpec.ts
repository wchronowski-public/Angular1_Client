import { expect } from 'chai';
import { FakeUser } from '../util/FakeUser';
import { AuthService } from '../../src/auth/AuthService';
import { IUser } from '../../src/auth/IUser';

describe('AuthService', () => {
  const user: IUser = new FakeUser();

  it('is authenticated when a user is present', () => {
    const auth = new AuthService({ user });

    expect(auth.isAuthenticated()).to.be.true;
  });

  it('is not authenticated when a user is not present', () => {
    const auth = new AuthService({ user: null });

    expect(auth.isAuthenticated()).to.be.false;
  });

  it('is authorized for a satisfied permission', () => {
    const auth = new AuthService({ user });
    const permission = (u: IUser) => true;

    expect(auth.isAuthorized(permission)).to.be.true;
  });

  it('is not authorized for a not satisfied permission', () => {
    const auth = new AuthService({ user });
    const permission = (u: IUser) => false;

    expect(auth.isAuthorized(permission)).to.be.false;
  });

  it('returns agency number from user', () => {
    user.agencyNumber = 'A777777';
    const auth = new AuthService({ user });

    expect(auth.getAgencyNumber()).to.eql('A777777');
  });
});
