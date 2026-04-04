import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Space, Form, App } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { useMemo, useCallback, useState, useRef } from 'react';
import Input, { InputModal } from '@/components/ChartComponents/Common/Input';
import Modal from '@/components/FocusModal';
import GhostButton from '@/components/GhostButton';
import IconTooltip from '@/components/IconTooltip';
import { getPath } from '@/utils/Assist/Component';
import MapTable from '../../../MapTable';
import VariableUsage, { VariableUsageRef } from '../../../VariableUsage';
import { updateInteractiveAndSyncParams } from '../../../utils';
import styles from './index.less';

const { Item, useForm } = Form;

type IProps = {
  value: ComponentData.TBaseInteractiveConfig;
  onChange?: ComponentMethod.SetComponentMethod;
  id: string;
  dataSource: ComponentData.TBaseInteractiveConfig[];
  disabled?: boolean;
};

const EditModal = (props: {
  onOk?: (value: { key: string; description?: string }) => void;
  fields: ComponentData.TBaseInteractiveConfigField[];
  disabled?: boolean;
}) => {
  const { onOk, fields, disabled = false } = props;

  const { message } = App.useApp();

  const [form] = useForm();

  const [visible, setVisible] = useState<boolean>(false);

  const nameList = useMemo(() => {
    return fields.map((item) => item.key);
  }, [fields]);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleOk = useCallback(() => {
    const { key, ...nextValues } = form.getFieldsValue();
    if (nameList.includes(key)) return message.info('存在相同字段');
    onOk?.({
      ...nextValues,
      key,
    });
    hide();
  }, [onOk, nameList]);

  return (
    <>
      <GhostButton disabled={disabled} onClick={show}>
        新增字段
      </GhostButton>
      <Modal title="新增字段" open={visible} onCancel={hide} onOk={handleOk}>
        <Form
          form={form}
          size="small"
          className={styles['design-config-interactive-base-field-add-modal']}
        >
          <Item
            label="字段key"
            name="key"
            rules={[
              {
                required: true,
                message: '请输入字段key',
              },
            ]}
          >
            <Input />
          </Item>
          <Item label="字段说明" name="description">
            <Input />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

const FieldSetting = (props: IProps) => {
  const { value, onChange, id, dataSource, disabled = false } = props;
  const { name, fields, show, type, extend } = value;

  const variableUsageRef = useRef<VariableUsageRef>(null);

  const onFieldMapChange = useCallback(
    (
      value: ComponentData.TBaseInteractiveConfigField,
      key: keyof ComponentData.TBaseInteractiveConfigField,
      mapValue,
    ) => {
      const path = getPath(id);

      const updateConfig = updateInteractiveAndSyncParams({
        componentId: id,
        isDefaultValue: key === 'defaultValue' || (key as 'variable'),
        interactive: dataSource,
        newValue: mapValue,
        targetInteractiveName: name,
        callback: (field) => {
          return field.key === value.key;
        },
      });
      if (updateConfig) {
        onChange?.({
          value: updateConfig,
          id,
          path,
          action: 'update',
        });
      }
    },
    [id, onChange, dataSource],
  );

  const handleAdd = useCallback(
    (value: any) => {
      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: [
                    ...fields,
                    {
                      ...value,
                    },
                  ],
                };
              }),
            },
          },
        },
        id,
        action: 'update',
      });
    },
    [fields, onChange, dataSource],
  );

  // 删除
  const handleDelete = useCallback(
    (record) => {
      const newFields = [...fields].filter((item) => item.key !== record.key);
      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: newFields,
                };
              }),
            },
          },
        },
        id,
        action: 'update',
      });
    },
    [fields, onChange, dataSource],
  );

  // 查看使用情况
  const handleCheck = useCallback((record) => {
    const { variable } = record;
    variableUsageRef.current?.open(variable);
  }, []);

  const columns = useMemo<
    ColumnsType<ComponentData.TBaseInteractiveConfigField>
  >(() => {
    return [
      {
        key: 'key',
        title: '字段',
        dataIndex: 'key',
      },
      {
        key: 'variable',
        title: (
          <>
            绑定到变量
            <IconTooltip
              title={
                <div className="ali-l">
                  当前逻辑为：只有设置了绑定变量才可使用（默认值同样需要在此值设置的情况下）。
                </div>
              }
            >
              <InfoCircleOutlined className="m-l-4" />
            </IconTooltip>
          </>
        ),
        dataIndex: 'variable',
        width: 100,
        render: (value, record) => {
          return (
            <InputModal
              className="w-100"
              value={value}
              onChange={onFieldMapChange.bind(null, record, 'variable')}
              placeholder="可自定义"
              disabled={disabled}
            />
          );
        },
      },
      {
        key: 'defaultValue',
        title: (
          <>
            默认值
            <IconTooltip
              title={
                <div className="ali-l">
                  若不可编辑可在基础配置中寻找是否存在默认值的配置
                </div>
              }
            >
              <InfoCircleOutlined className="m-l-4" />
            </IconTooltip>
          </>
        ),
        dataIndex: 'defaultValue',
        width: 90,
        render: (value, record) => {
          if (record._defaultValue_ === false) return value || '-';
          return (
            <InputModal
              className="w-100"
              value={value || ''}
              onChange={onFieldMapChange.bind(null, record, 'defaultValue')}
              placeholder="初始默认值"
              disabled={disabled}
            />
          );
        },
      },
      {
        key: 'description',
        title: '字段说明',
        dataIndex: 'description',
        width: 90,
        render: (value, record) => {
          return (
            <InputModal
              className="w-100"
              value={value || ''}
              onChange={onFieldMapChange.bind(null, record, 'description')}
              placeholder="请输入字段说明"
            />
          );
        },
      },
      {
        key: 'operation',
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        render: (_, record) => {
          return (
            <Space>
              <Button
                disabled={disabled || !record.variable}
                type="link"
                onClick={handleCheck.bind(null, record)}
              >
                使用情况
              </Button>
              {!!extend && (
                <Button
                  type="link"
                  danger
                  disabled={disabled}
                  onClick={handleDelete.bind(null, record)}
                >
                  删除
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }, [onChange, onFieldMapChange, disabled, extend, handleDelete, handleCheck]);

  return (
    <>
      {!!extend && (
        <EditModal disabled={disabled} onOk={handleAdd} fields={fields} />
      )}
      <MapTable
        dataSource={fields}
        columns={columns}
        rowKey="key"
        scroll={{ x: 'max-content' }}
      />
      <VariableUsage ref={variableUsageRef} />
    </>
  );
};

export default FieldSetting;
