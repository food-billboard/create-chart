import Checkbox from '@/components/ChartComponents/Common/Checkbox';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import MapTable from '@/components/ChartComponents/Common/MapTable';
import Select from '@/components/ChartComponents/Common/Select';
import { ConnectState } from '@/models/connect';
import { mergeWithoutArray } from '@/utils';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { nanoid } from 'nanoid';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import SubTitle, { SubForm } from '../../SubTitle';
import { ApiConfigProps } from '../ApiConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type MockConfigProps = ApiConfigProps;

const _FieldsConfig = ({
  value = [],
  onChange,
  mockKindList,
}: {
  value: ComponentData.TComponentApiDataConfig['request']['mock']['fields'];
  onChange: (
    value: ComponentData.TComponentApiDataConfig['request']['mock']['fields'],
  ) => void;
  mockKindList: API_MOCK.TGetMockKindListData[];
}) => {
  const onValueChange = useCallback(
    (record: any, index: number, key: string, newStateValue: any) => {
      const newValue = [...value];
      newValue.splice(index, 1, {
        ...record,
        [key]: newStateValue,
      });
      onChange(newValue);
    },
    [onChange, value],
  );

  const handleDelete = useCallback(
    (record: any) => {
      const newValue = value.filter((item) => item.id !== record.id);
      onChange(newValue);
    },
    [value, onChange],
  );

  const columns = useMemo(() => {
    return [
      {
        key: 'key',
        title: '字段名',
        dataIndex: 'key',
        render: (value: string, record: any, index: number) => {
          return (
            <Input
              className="w-100"
              value={value}
              onChange={onValueChange.bind(null, record, index, 'key')}
            />
          );
        },
      },
      {
        key: 'dataKind',
        title: '数据种类',
        dataIndex: 'dataKind',
        width: 140,
        render: (value: string, record: any, index: number) => {
          return (
            <Select
              className="w-100"
              value={value}
              onChange={onValueChange.bind(null, record, index, 'dataKind')}
              options={mockKindList.map((item) => {
                return {
                  label: item.value,
                  value: item.id,
                };
              })}
            />
          );
        },
      },
      {
        key: 'description',
        title: '描述',
        dataIndex: 'description',
        render: (_: string, record: any) => {
          const { dataKind } = record;
          const target = mockKindList.find((item) => item.id === dataKind);
          return target?.description || '无描述内容';
        },
      },
      {
        key: 'operation',
        title: '操作',
        dataIndex: 'operation',
        render: (_: string, record: any) => {
          return (
            <Button
              type={'link'}
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete.bind(null, record)}
            />
          );
        },
      },
    ];
  }, [onValueChange, mockKindList, handleDelete]);

  const handleAdd = useCallback(() => {
    onChange([
      ...value,
      {
        key: `key_${Date.now()}`,
        dataKind: '',
        id: nanoid(),
      },
    ]);
  }, [value, onChange]);

  return (
    <>
      <Button type="primary" onClick={handleAdd} className="m-t-8">
        新增字段
      </Button>
      <MapTable columns={columns} rowKey={'id'} dataSource={value} />
    </>
  );
};

const FieldsConfig = connect(
  (state: ConnectState) => {
    return {
      mockKindList: state.data.mockValueKindMap,
    };
  },
  () => ({}),
)(_FieldsConfig);

const MockConfig = (props: MockConfigProps) => {
  const {
    onChange: propsOnChange,
    value,
    params,
    constants,
    componentId,
  } = props;
  const {
    request: { mock },
  } = value;

  const { fields, random, total } = mock || {};

  const reRequest = useCallback(
    async (newValue) => {
      const result: any = await FilterDataUtil.requestData(
        componentId,
        newValue,
        params,
        constants,
      );
      propsOnChange?.(
        mergeWithoutArray({}, newValue, {
          request: {
            value: result,
          },
        }),
      );
    },
    [params, constants],
  );

  const onChange = useCallback(
    (newValue) => {
      reRequest(mergeWithoutArray({}, value, newValue));
    },
    [propsOnChange, reRequest, value],
  );

  return (
    <div>
      <SubTitle>请求字段</SubTitle>
      <SubForm>
        <FieldsConfig
          value={fields}
          onChange={(value) => {
            onChange?.({
              request: {
                mock: {
                  fields: value,
                },
              },
            });
          }}
        />
      </SubForm>
      <SubTitle>数据条数</SubTitle>
      <SubForm>
        <InputNumber
          value={total}
          onChange={(value) => {
            onChange?.({
              request: {
                mock: {
                  total: value as number,
                },
              },
            });
          }}
        />
      </SubForm>
      <SubForm>
        <Checkbox
          checked={random}
          onChange={(e) => {
            onChange?.({
              request: {
                mock: {
                  random: e.target.checked,
                },
              },
            });
          }}
        >
          随机返回
        </Checkbox>
      </SubForm>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MockConfig);
