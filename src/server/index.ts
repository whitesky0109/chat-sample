import 'reflect-metadata';

import { useContainer, useExpressServer } from 'routing-controllers';
import { useContainer as useContainerSocket, useSocketServer } from 'socket-controllers';
import { Container } from 'typedi';

import http from 'http';
import express, { Express }  from 'express';
import socketIo from 'socket.io';
import { EventEmitter } from 'events';
const morgan = require('morgan');
const figlet = require('figlet');
const cors = require('cors');
const path = require('path');
const open = require('open');

import { IService } from 'models/server';
import './controllers';
import {
  // System Services
  SettingService, StorageService, LoggerService,
  // Message Processing Services
  SocketManagerService,
  // Chat Services
  UserService, RoomService,
} from './services';
import StorageMigrationService from './services/system/StorageMigration.service';
import { WsMessageController } from './controllers/websocket/WsMessageController';

export default class MainServer extends EventEmitter {
  /* app에 대한 타입 설정 */
  private port: number;

  private io: SocketIO.Server;
  private app: express.Express;

  private server: http.Server;

  constructor(port?: string) {
    const rootPath: string = path.join('dist', 'public');
    super();

    /* setter */
    useContainer(Container);
    useContainerSocket(Container);

    /* create Server */
    this.app = express();
    this.app.use(cors());

    /* set Html View Render */
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('views', path.join(rootPath));
    this.app.set('view engine', 'html');

    useExpressServer(this.app);
    this.server = http.createServer(this.app);
    this.app.use('/public', express.static(rootPath));

    /* create websocket listener */
    this.io = socketIo(this.server);
    useSocketServer(this.io, {
      controllers: [WsMessageController],
    });

    /* create System Logger */
    const loggerSrv = Container.get(LoggerService);
    loggerSrv.info(`\n${figlet.textSync('Sample')}`);

    /* register logger Service */
    this.app.use(morgan('combined', { stream: loggerSrv }));

    /* register service instance */
    this.addServices();
    this.port = port ? parseInt(port, 10) : Container.get(SettingService).getPort();
  }

  public addMiddleware(middleware: any): void {
    this.app.use(middleware);
  }

  public async addServices(): Promise<void> {
    const etcInstances = [
      { name: 'socketIO', instance: this.io },
    ];

    const loggerSrv = Container.get(LoggerService);
    for (const { name, instance } of etcInstances) {
      Container.set(name, instance);
      loggerSrv.info(`[init] DI Registered ${name}`);
    }

    const registerServices = [
      /* System Services */
      SettingService,
      StorageService,
      StorageMigrationService,
      UserService,
      RoomService,
      SocketManagerService,
    ];
    // register system services
    for (const service of registerServices) {
      try {
        const instance: IService = Container.get(service as any);
        await instance.init();

        loggerSrv.info(`[Serivce Initialize] DI Registered ${service.name}`);
      } catch (e) {
        console.log(e.stack);
        loggerSrv.error(e);
      }
    }
    this.emit('ready');
  }

  public getApp(): Express {
    return this.app;
  }

  public runServ(): Promise<http.Server> {

    const loggerSrv = Container.get(LoggerService);
    return new Promise((resolve: any) => {
      this.once('ready', async () => {
        resolve(this.server.listen(this.port, () =>
          loggerSrv.info(`listening on port ${this.port}`)));
        // await open('http://localhost:4000');
      });
    });
  }
}
