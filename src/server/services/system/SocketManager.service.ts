import 'reflect-metadata';
import { Service } from 'typedi';
import { IService } from '../../../models/server';
import { LoggerService } from '.';

@Service()
export default class SocketManagerService implements IService {

  private sockets: any = {};

  constructor(private logger: LoggerService) {
    this.logger.info('created SocketMangerSrv');
  }

  public init(): Promise<any> {
    return Promise.resolve();
  }

  public addSocket(socket: SocketIO.Socket) {
    const { id } = socket;
    this.sockets[id] = socket;

    this.logger.info(`registerd ${id}`);
  }

  public delSocket(id: string) {
    this.logger.info(`unregisterd ${id}`);
    delete this.sockets[id];
  }

  public getSocket(id: string): SocketIO.Socket {
    return this.sockets[id];
  }

  public isExistSocket(id: string): boolean {
    return !!this.sockets[id];
  }

  public getAll(): any {
    return this.sockets;
  }

  public emitAll(event: string, message: any) {
    for (const id in this.sockets) {
      const socket: SocketIO.Socket = this.sockets[id];

      socket.emit(event, message);
    }
  }
}
