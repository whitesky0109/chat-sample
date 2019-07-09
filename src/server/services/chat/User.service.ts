import { Service } from 'typedi';

import { IService } from 'models/server';
import { LoggerService } from '../system';

@Service()
export default class UserService implements IService {
  userCache: any = {};

  constructor(private logSrv: LoggerService) { }

  public init(): any {
    this.logSrv.info('created UserService');
  }

  public addUser(id: string, sockId: string) {
    const alreadyLogined = this.getUserIdBySockId(sockId);
    if (alreadyLogined) {
      this.logSrv.info(`already logined user ${alreadyLogined}`);
      return false;
    }

    const sid = this.getSockIdById(id);
    if (sid) {
      this.logSrv.info('already used user id');
      return false;
    }

    this.userCache[id] = sockId;
    this.logSrv.info(`Logined New User : ${id}`);

    return true;
  }

  public removeUser(id: string) {
    this.userCache[id] = null;

    this.logSrv.info(`Logout User : ${id}`);
  }

  public getSockIdById(id: string) {
    return this.userCache[id];
  }

  public getUserIdBySockId(sockId: string) {
    for (const id in this.userCache) {
      if (sockId === this.userCache[id]) {
        return id;
      }
    }
    return null;
  }

  public getUsers() {
    return this.userCache;
  }
}
