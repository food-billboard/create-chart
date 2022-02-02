import { useMemo } from 'react';
import { Table } from 'antd';
import classnames from 'classnames';
import SubTitle, { SubForm } from '../SubTitle';
import commonStyles from '../../../../../FieldMap/index.less';

const ResponseDataMap = (props: {
  value?: ComponentData.TComponentMapData[];
}) => {
  const {
    value = [
      {
        field: 'name',
        map: '2222',
        id: '0',
        description: '字符型字段',
        type: 'string',
      },
    ],
  } = props;

  const responseTypeToString = useMemo(() => {
    return '列表'; // 数组
  }, []);

  const columns = useMemo(() => {
    return [
      {
        key: 'field',
        title: '字段',
        dataIndex: 'field',
        width: 140,
      },
      {
        key: 'map',
        title: '映射',
        dataIndex: 'map',
        width: 140,
      },
      {
        key: 'description',
        title: '说明',
        dataIndex: 'description',
      },
    ];
  }, []);

  return (
    <div>
      <SubTitle>
        数据响应结果应为{responseTypeToString}，{responseTypeToString}
        元素包含如下字段
      </SubTitle>
      <SubForm>
        <Table
          className={classnames(commonStyles['design-config-api-field-map'])}
          columns={columns}
          rowKey={'id'}
          bordered
          dataSource={value}
          pagination={false}
        />
      </SubForm>
    </div>
  );
};

export default ResponseDataMap;
