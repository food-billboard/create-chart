import type { ReactNode } from 'react';
import RequestLogger from './RequestLogger';

class Logger {
  dataSource: {
    [key: string]: {
      value: ReactNode[];
    };
  } = {
    request: {
      value: [],
    },
  };

  getLog(key: string) {
    return this.dataSource[key].value;
  }

  insertLog(key: string, value: ReactNode[] | ReactNode) {
    if (this.dataSource[key].value.length >= 100)
      this.dataSource[key].value.shift();
    this.dataSource[key].value.push(value);
  }

  clearLog(key?: string) {
    if (key) {
      this.dataSource[key].value = [];
    } else {
      Object.keys(this.dataSource).forEach((key) => {
        this.dataSource[key].value = [];
      });
    }
  }

  log(log: Logger.LoggerItemWithoutId) {
    const realLog: Logger.LoggerItem = {
      ...log,
      id: Date.now().toString() + '_' + Math.random(),
    };
    switch (log.type) {
      case 'request':
      default:
        this.insertLog(log.type, RequestLogger(this, realLog));
    }
  }
}

export default new Logger();
