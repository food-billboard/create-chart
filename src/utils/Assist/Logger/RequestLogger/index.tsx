import { Collapse, Table } from 'antd';
import ReactJson from '@/components/JsonView';
import { useIdPathMap } from '@/hooks';
import styles from './index.less';

const { Panel } = Collapse;

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
    id,
  } = log;
  const level = error ? 'Error' : 'Log';
  const { color } = levelInfo(level);
  const idPathMap = useIdPathMap();
  const { name } = idPathMap[component] || {};

  return (
    <Panel
      className={styles['request-log-item']}
      key={id}
      header={
        // title
        <div>
          <span style={{ color }}>{`[${level}]`}</span>
          {`{request}--${name}(${component})`}
        </div>
      }
    >
      <div>
        request type is: <span style={{ color: 'green' }}>{requestType}</span>
      </div>
      {requestType === 'api' ||
        (requestType === 'mock' && (
          <>
            {/* url & method */}
            <div>{`${method}-->${url}`}</div>
            {/* headers */}
            {!!headers && (
              <Table
                size="small"
                title={() => 'request headers'}
                columns={[
                  {
                    title: '(索引)',
                    dataIndex: 'key',
                  },
                  {
                    title: '值',
                    dataIndex: 'value',
                  },
                ]}
                dataSource={Object.entries(headers).map((item) => ({
                  key: item[0],
                  value: item[1],
                }))}
              />
            )}
            {/* params */}
            <Table
              size="small"
              title={() => 'request params'}
              columns={[
                {
                  title: '(索引)',
                  dataIndex: 'key',
                },
                {
                  title: '值',
                  dataIndex: 'value',
                },
              ]}
              dataSource={Object.entries(params).map((item) => ({
                key: item[0],
                value: item[1],
              }))}
            />
          </>
        ))}
      {/* response */}
      <div>
        {`this is the ${error ? 'error' : ''} response`}
        {error ? (
          <div style={{ color: 'red' }}>{error.toString()}</div>
        ) : (
          <ReactJson src={error || response}></ReactJson>
        )}
      </div>
    </Panel>
  );
}
