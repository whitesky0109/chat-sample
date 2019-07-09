
import 'reflect-metadata';
import { Service } from 'typedi';
import { IRepository, IMigration, IService, IMigrationLog } from 'models/server';
import StorageService from '../Storage.service';
import { LoggerService } from '..';
const { dataType } = require('db-migrate-shared');

@Service()
export default class MigrationLogRepository implements IRepository, IService {
  public tableName: string = 'migration_log';
  constructor(private logger: LoggerService,
              private storageSrv: StorageService,
    ) {
    this.logger.info('created Migration_logRepository');
  }

  public init(): Promise<any> {
    return Promise.resolve();
  }

    /* ref: https://db-migrate.readthedocs.io/en/latest/API/SQL/#migrations-api-sql */
  migrations(): IMigration[] {
    return [{ // v1 migration_log table
      migration_id: 'create table migration_log',
      action: 'createTable',
      args: [this.tableName, {
        id:             { type: dataType.INTEGER,
          primaryKey: true, autoIncrement: true, notNull: true },
        migration_id:   { type: dataType.STRING,    length: 255 },
        action:         { type: dataType.STRING,    notNull: true, length: 20 },
        params:         { type: dataType.TEXT,      notNull: true, defaultValue: '' },
        success:        { type: dataType.BOOLEAN,   notNull: true },
        error:          { type: dataType.TEXT,      defaultValue: '' },
        // tslint:disable-next-line: no-construct
        timestamp:      { type: dataType.DATE_TIME, defaultValue: new String('CURRENT_TIMESTAMP') },
      },
        (err: any) => {
          if (err) {
            this.logger.error(err);
          }
        }],
    },
    ];
  }

  public getMigrationLog(): Promise<IMigrationLog[]> {
    return new Promise((resolve) => {
      const { db } = this.storageSrv;
      db['all']('select * from migration_log',
                (err: any, logs: IMigrationLog[]) => {
                  if (err) { resolve([]); } else { resolve(logs); }
                });
    });
  }
}
