import { useMemo, useCallback, useState } from 'react';
import { Button, Space, Modal, Form, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Input from '@/components/ChartComponents/Common/Input';
import GhostButton from '@/components/GhostButton';
import { getPath } from '@/utils/Assist/Component';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import InteractiveUtil from '@/utils/Assist/Interactive';
import MapTable from '../../../MapTable';
import styles from './index.less';

const { Item, useForm } = Form;

type IProps = {
  value: ComponentData.TBaseInteractiveConfig;
  onChange?: ComponentMethod.SetComponentMethod;
  id: string;
  dataSource: ComponentData.TBaseInteractiveConfig[];
  params: ComponentData.TParams[];
  setParams: (value: ComponentData.TParams[]) => void;
};

const EditModal = (props: {
  onOk?: (value: { key: string; description?: string }) => void;
  fields: ComponentData.TBaseInteractiveConfigField[];
}) => {
  const { onOk, fields } = props;

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
      <GhostButton onClick={show}>新增字段</GhostButton>
      <Modal title="新增字段" visible={visible} onCancel={hide} onOk={handleOk}>
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
  const { value, onChange, id, dataSource, params, setParams } = props;
  const { name, fields, show, type, extend } = value;

  const onFieldMapChange = useCallback(
    (value: ComponentData.TBaseInteractiveConfigField, mapValue) => {
      const path = getPath(id);
      const { variable } = value;

      if (variable === mapValue) return;

      // sync the global params
      const mapId = InteractiveUtil.updateBaseInteractiveVariable(
        {
          params,
          setParams,
        },
        {
          variable: mapValue,
          id: value.mapId,
          origin: id,
          key: value.key,
          show,
          originId: type,
        },
      );

      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: item.fields.map((item) => {
                    if (item.key !== value.key) return item;
                    return {
                      ...item,
                      variable: mapValue,
                      mapId,
                    };
                  }),
                };
              }),
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    },
    [id, onChange, params, setParams, dataSource, show, type],
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
      const newFileds = [...fields].filter((item) => item.key !== record.key);
      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: newFileds,
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
        title: '绑定到变量',
        dataIndex: 'variable',
        width: 140,
        render: (
          value: string,
          record: ComponentData.TBaseInteractiveConfigField,
        ) => {
          return (
            <Input
              className="w-100"
              value={value}
              onChange={onFieldMapChange.bind(null, record)}
              placeholder="可自定义"
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
  }, [onChange, onFieldMapChange]);

  return (
    <>
      {!!extend && <EditModal onOk={handleAdd} fields={fields} />}
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
