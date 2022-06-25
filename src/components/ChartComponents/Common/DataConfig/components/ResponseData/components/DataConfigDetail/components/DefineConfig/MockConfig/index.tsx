import { useCallback, useMemo } from 'react';
import { merge } from 'lodash';
import { connect } from 'dva';
import { Button, Select } from 'antd';
import Input from '@/components/ChartComponents/Common/Input';
import FilterDataUtil from '@/utils/Assist/FilterData';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Checkbox from '@/components/ChartComponents/Common/Checkbox';
import { ConnectState } from '@/models/connect';
import SubTitle, { SubForm } from '../../SubTitle';
import { ApiConfigProps } from '../ApiConfig';
import MapTable from '@/components/ChartComponents/Common/MapTable';
import { mapStateToProps, mapDispatchToProps } from './connect';

export type MockConfigProps = ApiConfigProps;

const _FieldsConfig = ({
  value,
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
        key: 'type',
        title: '数据格式',
        dataIndex: 'type',
        width: 140,
        render: (value: string, record: any, index: number) => {
          return (
            <Select
              className="w-100"
              value={value}
              options={[
                {
                  label: '数字',
                  value: 'number',
                },
                {
                  label: '字符串',
                  value: 'string',
                },
              ]}
              onChange={onValueChange.bind(null, record, index, 'type')}
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
    ];
  }, [onValueChange, mockKindList]);

  const handleAdd = useCallback(() => {
    onChange([
      ...value,
      {
        key: `key_${Date.now()}`,
        type: 'string',
        dataKind: '',
      },
    ]);
  }, []);

  return (
    <>
      <Button type="primary" onClick={handleAdd} className="m-t-8">
        新增字段
      </Button>
      <MapTable columns={columns} rowKey={'key'} dataSource={value} />
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
  const { onChange: propsOnChange, value, params, constants } = props;
  const {
    request: { mock },
  } = value;

  const { fields, random, total } = mock || {};

  const reRequest = useCallback(
    async (newValue) => {
      const result: any = await FilterDataUtil.requestData(
        newValue,
        params,
        constants,
      );
      propsOnChange?.(
        merge({}, newValue, {
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
      reRequest(merge({}, value, newValue));
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
