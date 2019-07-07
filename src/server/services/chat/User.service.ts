import { Service } from 'typedi';

import { IService } from '../../../models/server';
import { LoggerService } from '../system';

@Service()
export default class UserService implements IService {
  userCache: any = {};

  constructor(private logSrv: LoggerService) { }

  public init(): any {
    this.logSrv.info('created UserService');
  }

  public addUser(id: string, name: string) {
    const uid = this.getUserIdByName(name);

    if (!uid) {
      this.userCache[id] = name;
      this.logSrv.info(`Logined New User : ${name}`);

      return true;
    }

    this.logSrv.info('already used user id');

    return false;
  }

  public removeUser(id: string) {
    const name = this.getUsernameById(id);

    delete this.userCache[id];

    this.logSrv.info(`Logout User : ${name}`);
  }

  public getUsernameById(id: string) {
    return this.userCache[id];
  }

  public getUserIdByName(userName: string) {
    for (const id in this.userCache) {
      if (userName === this.userCache[id]) {
        return id;
      }
    }
    return null;
  }

  public getUsers() {
    return this.userCache;
  }
}
