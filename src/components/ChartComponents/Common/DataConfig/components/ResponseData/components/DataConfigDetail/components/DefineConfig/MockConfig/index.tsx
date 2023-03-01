import { useCallback, useMemo } from 'react';
import { Button, Select } from 'antd';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react-lite';
import { DeleteOutlined } from '@ant-design/icons';
import { useMobxContext } from '@/hooks';
import Input from '@/components/ChartComponents/Common/Input';
import FilterDataUtil from '@/utils/Assist/FilterData';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Checkbox from '@/components/ChartComponents/Common/Checkbox';
import MapTable from '@/components/ChartComponents/Common/MapTable';
import { mergeWithoutArray } from '@/utils';
import SubTitle, { SubForm } from '../../SubTitle';
import { ApiConfigProps } from '../ApiConfig';

export type MockConfigProps = ApiConfigProps;

const FieldsConfig = observer(
  ({
    value = [],
    onChange,
  }: {
    value: ComponentData.TComponentApiDataConfig['request']['mock']['fields'];
    onChange: (
      value: ComponentData.TComponentApiDataConfig['request']['mock']['fields'],
    ) => void;
  }) => {
    const {
      data: { mockValueKindMap: mockKindList },
    } = useMobxContext();

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
  },
);

const MockConfig = (props: MockConfigProps) => {
  const { onChange: propsOnChange, value } = props;
  const {
    request: { mock },
  } = value;
  const { fields, random, total } = mock || {};
  const {
    global: {
      screenData: {
        config: {
          attr: { params, constants },
        },
      },
    },
  } = useMobxContext();

  const reRequest = useCallback(
    async (newValue) => {
      const result: any = await FilterDataUtil.requestData(
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

export default observer(MockConfig);
