export enum Level {
  Info,
  Warn,
  Error,
}

export type Notification = {
  message: string,
  level: Level,
  isExpiring?: boolean,
};
