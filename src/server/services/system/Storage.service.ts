/*
    sqlite3 node libraries
    ref: https://db-migrate.readthedocs.io/en/latest/API/SQL/#migrations-api-sql
*/
const driver = require('db-migrate-sqlite3');
const { dataType } = require('db-migrate-shared');

import 'reflect-metadata';
import { Service } from 'typedi';
import { SettingService, LoggerService } from '.';
import { EventEmitter } from 'events';
import { IService } from '../../../models/server';

@Service()
export default class StorageService extends EventEmitter implements IService {

  public db: any;
  private dbname: string;

  constructor(
        private loggerService: LoggerService,
        private settingSrv: SettingService,
    ) {
    super();
    this.loggerService.info('created StorageSrv');
    this.dbname = this.settingSrv.getSystemDbName();
  }

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connect(this.dbname).then((db: any) => {
        this.db = db;
        this.loggerService.info(`Connected to the ${this.dbname} database.`);
        resolve();
      },                             (error: Error) => {
        reject(error);
      });
    });
  }

  private connect(dbname: string): Promise<any> {
    this.loggerService.info(`try load sqlite : ${dbname}`);
    (this.loggerService as any)['sql'] = this.sqlLogger.bind(this);

    return new Promise((resolve, reject) => {
            /* if not exist then create database file */
      const internals = {
        mod: {
          log: this.loggerService,
          type: dataType,
        },
        interfaces: {
          SeederInterface: {},
          MigratorInterfrace: {},
        },
      };
      const val = { driver: 'sqlite3', filename: this.dbname };
      driver.connect(val, internals, (err: Error, db: any) => {
        if (err) { reject(err); } else {
          db.all('PRAGMA foreign_keys=ON');
          resolve(db);
        }
      });
    });
  }

  private sqlLogger() {
    /*
    this.logger.debug(arguments[0], {
      meta: {
        __filename,
        __function: (global as any).__function,
        __line: (global as any).__line,
      },
    });
    */
  }
}
