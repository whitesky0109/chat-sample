import { Service } from 'typedi';
import { LoggerService } from '..';
import { UserService } from '.';
import { IService, IRoom } from 'models/server';

@Service()
export default class RoomService implements IService {
  listCache: IRoom = {};

  constructor(
    private loggerService: LoggerService,
    private userService: UserService,
  ) { }

  public init(): any {
    this.loggerService.info('created RoomService');
  }

  public addRoom(id: string, name: string, creator: string) {
    this.listCache[id] = {
      name,
      creator,
      users: {
        [creator]: null,
      },
    };
  }

  public getRooms(userId?: string) {
    if (!userId) {
      return this.listCache;
    }

    return this.getRoomByUserId(userId);
  }

  public getRoomByUserId(userId: string) {
    let result: IRoom | undefined;

    for (const roomId in this.listCache) {
      for (const uid in this.listCache[roomId].users) {
        if (uid === userId) {
          if (!result) {
            result = {};
          }
          result[roomId] = this.listCache[roomId];
        }
      }
    }

    return result;
  }

  public getRoom(id: string) {
    for (const roomId in this.listCache) {
      if (id === roomId) {
        return this.listCache[roomId];
      }
    }

    return null;
  }

  public loginUser(roomId: string, userId: string) {
    const room = this.getRoom(roomId);
    const sockId = this.userService.getSockIdById(userId);

    const rooms = this.getRoomByUserId(userId);
    if (rooms) {
      for (const roomId in rooms) {
        this.logoutUser(roomId, userId);
      }
    }

    if (userId && room) {
      room.users[userId] = sockId;
      this.loggerService.info(`[${room.name}] Chat room login: ${userId}`);
      return true;
    }

    return false;
  }

  public loginUsers(roomId: string, users: string[]) {
    for (const userId of users) {
      this.loginUser(roomId, userId);
    }
  }

  public logoutUser(roomId: string, userId: string) {
    const room = this.getRoom(roomId);

    if (userId && room) {
      room.users[userId] = null;
      this.loggerService.info(`[${room.name}] Chat room logout: ${userId}`);
      return true;
    }

    return false;
  }

  public logoutRoom(userId: string) {
    const roomList = this.getRoomByUserId(userId);
    for (const roomId in roomList) {
      this.logoutUser(roomId, userId);
    }
  }

  public isExistUser(roomId: string, userId: string) {
    const room = this.getRoom(roomId);

    if (room) {
      for (const uid in room.users) {
        if (uid === userId) {
          return true;
        }
      }
    }
    return false;
  }
}
