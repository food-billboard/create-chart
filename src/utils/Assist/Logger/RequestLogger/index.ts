import chalk from 'chalk';
import { useIdPathMap } from '@/hooks';

function levelInfo(level: Logger.LoggerLevel) {
  switch (level) {
    case 'Log':
      return {
        color: 'black',
      };
    case 'Info':
      return {
        color: 'green',
      };
    case 'Warn':
      return {
        color: 'yellow',
      };
    case 'Error':
      return {
        color: 'red',
      };
  }
  return {
    color: 'black',
  };
}

export default function logRequest(context: any, log: Logger.LoggerItem) {
  const {
    url,
    method,
    params,
    headers,
    response,
    error,
    component,
    requestType,
  } = log;
  const level = error ? 'Error' : 'Log';
  const { color } = levelInfo(level);
  const idPathMap = useIdPathMap();
  const { name } = idPathMap[component] || {};
  // title
  console.groupCollapsed(
    (chalk as any)[color](`[${level}]{request}--${name}(${component})`),
  );
  console.log(`request type is: `, chalk.green(requestType));
  if (requestType === 'api' || requestType === 'mock') {
    // url & method
    console.log(`${method}-->${url}`);
    // headers
    if (headers) {
      console.log('request headers is: ');
      console.table(headers);
    }
    // params
    console.log('request params is: ');
    console.table(params);
  }
  // response
  console.log(`this is the ${error ? 'error' : ''} response`, response);
  console.groupEnd();
}
