import { IUser } from './IUser';

export type Permission = (user: IUser) => boolean;

const NONE = (_: IUser): boolean => {
  return true;
};

export const PERMISSIONS = {
  NONE,
};

export const ADD_PERMISSIONS_TO_ROOT_SCOPE = ['$rootScope', ($rootScope: any) => $rootScope.PERMISSIONS = PERMISSIONS];
