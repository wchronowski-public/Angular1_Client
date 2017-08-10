import { IUser } from './auth/IUser';

export interface IUserConfig {
  user: IUser;
}

export interface IExternalUrlConfig {
  homeRaterUrl: string;
}

export interface IServerBasePathConfig {
  serverBasePath: string;
}

export interface IEnvironmentConfiguration extends
  IExternalUrlConfig,
  IUserConfig,
  IServerBasePathConfig {}

export const CONFIG = 'config';
