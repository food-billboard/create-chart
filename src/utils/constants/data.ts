export const DEFAULT_FILTER_CODE = `return data`;

export const DATA_TYPE_MAP = [
  {
    label: 'Mysql',
    value: 'Mysql',
    defaultJDBCURL:
      'jdbc:mysql://localhost:3306/db_name?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf-8&useSSL=false&useOldAliasMetadataBehavior=true',
  },
  {
    label: 'ClickHouse',
    value: 'ClickHouse',
    defaultJDBCURL: 'jdbc:clickhouse://localhost:8123/db_name',
  },
  {
    label: 'PostgreSQL',
    value: 'PostgreSQL',
    defaultJDBCURL: 'jdbc:postgresql://localhost:13308/db_name',
  },
  {
    label: 'Oracle',
    value: 'Oracle',
    defaultJDBCURL: 'jdbc:oracle:thin:@localhost:1521:orcl',
  },
  {
    label: 'SqlServer',
    value: 'SqlServer',
    defaultJDBCURL: 'jdbc:sqlserver://localhost:1433;databaseName=db_name',
  },
];
