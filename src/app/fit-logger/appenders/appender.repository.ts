import { ServerAppender } from './server.appender';
import { AppenderOptions, LogLevel } from '../../fit-logger-core/index';
import { ConsoleAppender } from './console.appender';
import { Appender } from './appender';
import { WebWorkerAppender } from './worker.appender';


export class AppenderRepository {
      private static _instance = new AppenderRepository();
      private appenderMap: Map<string, Appender> = new Map();

      constructor() {
            if (AppenderRepository._instance) {
                  throw new Error("Error: Instantiation failed: Use AppenderRepository.instance instead of new.");
            }
            AppenderRepository._instance = this;
            this.appenderMap.set('console', new ConsoleAppender({
                  name: 'console',
                  format: 'text',
                  logLevel: LogLevel.INFO
            }));
            this.appenderMap.set('server', new ServerAppender({
                  name: 'server',
                  format: 'json',
                  logLevel: LogLevel.INFO,
                  isDefferred: true
            }));
            this.appenderMap.set('worker', new WebWorkerAppender({
                  name: 'worker',
                  format: 'json',
                  logLevel: LogLevel.INFO,
                  isDefferred: true,
                  path: 'assets/worker/socket-logger.js'
            }));
      }

      getAppender(name: string): Appender {
            if (this.appenderMap.has(name)) {
                  return this.appenderMap.get(name);
            }
            throw new Error(`LogAppender : ${name} is not found`);
      }
      static get instance(): AppenderRepository {
            return AppenderRepository._instance;
      }
}
