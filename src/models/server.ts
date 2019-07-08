export interface IMigration {
  migration_id: string;
  action: string;
  args: any[];
}

export interface IRepository {
  migrations(): IMigration[];
}

export interface IService {
  init(): Promise<any>;
}

export interface IMigrationLog {
  id: number;
  migration_id: string;
  action: string;
  success: boolean;
  error: string;
  timestamp: Date;
}

export interface IMigrationLogs {
  // tslint:disable-next-line: variable-name
  [migration_id: string]: IMigrationLog;
}

export interface IInvite {
  roomId: string;
  users: string[];
}

export interface IMessage {
  userId: string;
  type: string;
  message: ArrayBuffer | string;
  date: Date;
  isMy: boolean;
}

export interface IUser {
  [userId: string]: string | null;
}

export interface IRoomInfo {
  name: string;
  users: IUser;
  creator: string;
}

export interface IRoom {
  [roomId: string]: IRoomInfo;
}
