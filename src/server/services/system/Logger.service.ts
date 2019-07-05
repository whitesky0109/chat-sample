import 'reflect-metadata';
import { Logger, format, createLogger, transports } from 'winston';
import { Service } from 'typedi';
import { IService } from '../../../models/server';

@Service()
export default class LoggerService implements IService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
            // level: 'info',
      format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format((info) => {
                  if (info.level === 'error') {
                    return Object.assign({}, info, {
                      message: `${info.timestamp} ${info.stack}`,
                    });
                  }
                  return info;
                })(),
                format.printf(
                    ({ timestamp, level, message, meta }) => (meta)
                    ? `${timestamp} ${level} [${meta.filename}:${meta.line}]: ${message}`
                    : `${timestamp} ${level} ${message}`,
                ),
            ),
      transports: [
        new transports.Console({ level: 'debug', handleExceptions: true }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'system.log' }),
      ],
      exitOnError: false,
    });
  }

  public init(): any {
    this.logger.info('created LoggerSrv');
  }

  public write(message: any, encoding: any) { this.logger.info(message); }

  public alert(msg: any, index = 3) { this.logger.alert(msg); }

  public crit(msg: any, index = 3) { this.logger.crit(msg); }

  public data(msg: any, index = 3) { this.logger.data(msg); }

  public debug(msg: any, index = 3) { this.logger.debug(msg); }

  public error(msg: any, index = 3) { this.logger.error(msg); }

  public help(msg: any, index = 3) { this.logger.help(msg); }

  public input(msg: any, index = 3) { this.logger.input(msg); }

  public info(msg: any, index = 3) { this.logger.info(msg); }

  public log(level: string, msg: any, index = 3) { this.logger.log(level, msg); }

  public notice(msg: any, index = 3) { this.logger.notice(msg); }

  public sql(msg: any, index = 3) { this.debug(msg, index); }

  public prompt(msg: any, index = 3) { this.logger.prompt(msg); }

  public silly(msg: any, index = 3) { this.logger.silly(msg); }

  public verbose(msg: any, index = 3) { this.logger.verbose(msg); }

  public warn(msg: any, index = 3) { this.logger.warn(msg); }

  public warning(msg: any, index = 3) { this.logger.warning(msg); }
}
