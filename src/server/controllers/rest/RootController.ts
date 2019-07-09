import 'reflect-metadata';
import { Controller, Get, Render } from 'routing-controllers';
import { LoggerService } from 'server/services';

@Controller('')
export class RootController {

  constructor(private loggerSrv: LoggerService) {
    this.loggerSrv.info('created RootController');
  }

  @Get('/')
  @Render('index.html')
  helloServer() {
  }
}
