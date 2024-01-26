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

export const DATA_SET_TYPE_MAP = [
  {
    label: '原始数据集',
    value: 'origin-set',
    tooltip: '直接查询某个数据库表',
  },
  {
    label: '自助数据集 ',
    value: 'self-set',
    tooltip: '自定义SQL语句查询',
  },
  {
    label: '存储过程数据集',
    value: 'process-store-set',
    tooltip: '调用数据库存储过程查询',
  },
  {
    label: 'JSON数据集',
    value: 'json-set',
    tooltip: '直接定义静态数据',
  },
  {
    label: 'HTTP数据集',
    value: 'http-set',
    tooltip: '接入第三方HTTP服务查询',
  },
  {
    label: '脚本数据集',
    value: 'script-set',
    tooltip: '支持ES、Mongodb、国产化数据库、自定义Java代码查询',
  },
];
