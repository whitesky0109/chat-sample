import 'reflect-metadata';
import { Service } from 'typedi';
import { EventEmitter } from 'events';
import { IMigrationLogs, IMigrationLog, IService } from '../../../models/server';
import migrationLogRepository from './repositories/migrationLog.repository';
import StorageService from './Storage.service';
import { LoggerService } from '.';

@Service()
export default class StorageMigrationService extends EventEmitter implements IService {

  private migrations: any[] = [];

  constructor(
    private logger: LoggerService,
    private storageSrv: StorageService,

    /* sqlite3 table reposiotries */
    private migrationLogRepository: migrationLogRepository,
  ) {
    super();
    this.logger.info('created StorageMigrationSrv');
  }

  public init(): Promise<any> {
    const migrationLogs: IMigrationLogs = {};
    return this.migrationLogRepository.getMigrationLog().then((logs: IMigrationLog[]) => {
      for (const log of logs) {
        if (log.success) {
          migrationLogs[log.migration_id] = log;
        }
      }
      return migrationLogs;
    }).then((migrationLogs: IMigrationLogs) => {
      this.addMigrations();
      this.dbMigration(migrationLogs);
    });
  }

  // tslint:disable-next-line: variable-name
  public addMigration(migration_id: string, action: string, args: any[]) {
    this.migrations.push({ migration_id, action, args });
  }

  private addMigrations() {
    const arr = [
      this.migrationLogRepository.migrations(),
    ];

    for (const migration of arr) {
      this.migrations = this.migrations.concat(migration);
    }
  }

  private dbMigration(migrationLogs: IMigrationLogs) {
    for (const { migration_id, action, args } of this.migrations) {
      if (!migrationLogs[migration_id]) {
        this.logger.info(`execute ${migration_id}`);

        /* change callback function */
        const callback: Function = args[args.length - 1];
        args[args.length - 1] = (...params: any) => {
          const [err] = params;
          const success: boolean = !err ? true : false;

          /* double quatation이 들어간 경우 오류 발생 */
          const error: string = err ? err.message.replace(/\"/gi, "'") : '';
          const arg: string = JSON.stringify(args.slice(0, args.length - 1)).replace(/\"/gi, "'");

          /* write migration_log */
          const { db } = this.storageSrv;
          db['insert']('migration_log',
                       ['migration_id', 'action', 'success', 'error', 'params'],
                       [migration_id, action, success, error, arg],
                       (err: any) => {
                         if (err) {
                           this.logger.error(err);
                         }
                       },
          );
          callback.apply(this.storageSrv.db, params);
        };

        try {
          this.storageSrv.db[action].apply(this.storageSrv.db, args);
        } catch (err) {
          this.logger.error(err);
        }
      }
    }
  }
}
