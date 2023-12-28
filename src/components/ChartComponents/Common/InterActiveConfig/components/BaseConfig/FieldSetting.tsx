import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Space, Modal, Form, App } from 'antd';
import { useMemo, useCallback, useState } from 'react';
import Input, { InputModal } from '@/components/ChartComponents/Common/Input';
import GhostButton from '@/components/GhostButton';
import IconTooltip from '@/components/IconTooltip';
import { getPath } from '@/utils/Assist/Component';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import MapTable from '../../../MapTable';
import { updateInteractiveAndSyncParams } from '../../../utils';
import styles from './index.less';

const { Item, useForm } = Form;

type IProps = {
  value: ComponentData.TBaseInteractiveConfig;
  onChange?: ComponentMethod.SetComponentMethod;
  id: string;
  dataSource: ComponentData.TBaseInteractiveConfig[];
  params: ComponentData.TParams[];
  setParams: (value: ComponentData.TParams[]) => void;
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
    CopyAndPasteUtil.forceFocus();
  };

  const hide = () => {
    setVisible(false);
    form.resetFields();
    CopyAndPasteUtil.forceUnFocus();
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
  const {
    value,
    onChange,
    id,
    dataSource,
    params,
    setParams,
    disabled = false,
  } = props;
  const { name, fields, show, type, extend } = value;

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

      // ! 上面没问题的话把下面删了
      // const updateValue = value[key];
      // const variable = key === 'variable' ? mapValue : value.variable;
      // const realValue = key === 'defaultValue' ? mapValue : value.defaultValue;

      // if (updateValue === mapValue) return;

      // // sync the global params
      // const mapId = InteractiveUtil.updateBaseInteractiveVariable(
      //   {
      //     params,
      //     setParams,
      //   },
      //   {
      //     variable,
      //     id: value.mapId,
      //     origin: id,
      //     key: value.key,
      //     show,
      //     originId: type,
      //     value: realValue,
      //   },
      // );

      // onChange?.({
      //   value: {
      //     config: {
      //       interactive: {
      //         base: dataSource.map((item) => {
      //           if (item.name !== name) return item;
      //           return {
      //             ...item,
      //             fields: item.fields.map((item) => {
      //               if (item.key !== value.key) return item;
      //               return {
      //                 ...item,
      //                 mapId,
      //                 [key]: mapValue,
      //               };
      //             }),
      //           };
      //         }),
      //       },
      //     },
      //   },
      //   id,
      //   path,
      //   action: 'update',
      // });
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

  const columns = useMemo(() => {
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
        render: (
          value: string,
          record: ComponentData.TBaseInteractiveConfigField,
        ) => {
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
        render: (
          value: string | false,
          record: ComponentData.TBaseInteractiveConfigField,
        ) => {
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
      },
    ];
  }, [onChange, onFieldMapChange, disabled]);

  return (
    <>
      {!!extend && (
        <EditModal disabled={disabled} onOk={handleAdd} fields={fields} />
      )}
      <MapTable
        dataSource={fields}
        columns={
          !!extend
            ? [
                ...columns,
                {
                  key: 'operation',
                  title: '操作',
                  dataIndex: 'operation',
                  render: (_, record, index) => {
                    return (
                      <Space>
                        <Button
                          type="link"
                          danger
                          disabled={disabled}
                          icon={<DeleteOutlined />}
                          onClick={handleDelete.bind(null, record)}
                        />
                      </Space>
                    );
                  },
                },
              ]
            : columns
        }
        rowKey="key"
      />
    </>
  );
};

export default FieldSetting;
