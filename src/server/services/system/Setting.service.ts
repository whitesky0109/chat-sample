import 'reflect-metadata';
import { Service } from 'typedi';
import { IService } from 'models/server';
import { LoggerService } from '.';

@Service()
export default class SettingService implements IService {

  private settings: any;
  constructor(private logger: LoggerService) {
    this.logger.info('created SettingSrv');
    this.settings = this.loadSettingFile();
  }

  init(): Promise<any> {
    return Promise.resolve();
  }

  loadSettingFile(): any {
    const config: any = require('../../config/config.json');
    return config;
  }

  getPort(): number {
    return this.settings['port'];
  }

  getSystemDbName(): string {
    return this.settings.sqlite;
  }

  getSettings(): any {
    return this.settings;
  }
}
