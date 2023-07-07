import { message } from 'antd';
import type { ReactNode } from 'react';
import RequestLogger from './RequestLogger';

class Logger {
  dataSource: {
    [key: string]: {
      value: ReactNode[];
    };
  } = {
    0: {
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

  log(log: Logger.LoggerItem) {
    switch (log.type) {
      case 'request':
      default:
        RequestLogger(this, log);
    }
  }
}

export default new Logger();
