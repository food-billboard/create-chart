import { Modal, Form, Button, Input, Select } from 'antd';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { postDataSource, updateDataSource } from '@/services';
import { DATA_TYPE_MAP } from '@/utils/constants';
import TestDataButton from '../GroupList';

const { Item } = Form;

export type EditModalRef = {
  open: (value?: API_DATA_MANAGE.DataSourceData) => void;
};

export type EditModalProps = {
  onOk?: () => void;
};

type FormData = API_DATA_MANAGE.UpdateDataSourceParams;

const DEFAULT_FORM_DATA: FormData = {
  name: '',
  dataType: 'Mysql',
  jdbc:
    DATA_TYPE_MAP.find((item) => item.value === 'Mysql')?.defaultJDBCURL || '',
  memo: '',
  username: 'root',
  password: '',
  _id: '',
};

const EditModal = forwardRef<EditModalRef, EditModalProps>((props, ref) => {
  const { onOk: propsOnOk } = props;

  const [visible, setVisible] = useState(false);

  const formTitle = useRef('新增数据源');

  const [form] = Form.useForm();

  const open = useCallback((value?: API_DATA_MANAGE.DataSourceData) => {
    if (value) {
      formTitle.current = '编辑数据源';
    }
    form.setFieldsValue({
      ...DEFAULT_FORM_DATA,
      ...(value || {}),
    });
    formTitle.current = '新增数据源';
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    form.resetFields();
    setVisible(false);
  }, []);

  const onOk = useCallback(async () => {
    form
      .validateFields()
      .then((formValue) => {
        if (formValue?._id) {
          return updateDataSource(
            formValue as API_DATA_MANAGE.UpdateDataSourceParams,
          );
        } else {
          return postDataSource(
            formValue as API_DATA_MANAGE.PostDataSourceParams,
          );
        }
      })
      .then(() => {
        propsOnOk?.();
      })
      .catch((err) => {});
  }, [propsOnOk]);

  const onValueChange = useCallback((changeValues, values) => {
    if (changeValues.dataType) {
      const target = DATA_TYPE_MAP.find(
        (item) => item.value === changeValues.dataType,
      );
      if (target) {
        form.setFieldValue('jdbc', target.defaultJDBCURL);
      }
    }
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Modal
      open={visible}
      title={formTitle.current}
      onCancel={close}
      onOk={onOk}
      footer={[
        <TestDataButton key="test" getValues={form.getFieldsValue} />,
        <Button key="cancel" onClick={close}>
          取消
        </Button>,
        <Button key="confirm" type="primary" onClick={onOk}>
          确定
        </Button>,
      ]}
      width={600}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onValuesChange={onValueChange}
        form={form}
      >
        <Item<FormData> label="类型" required name="dataType">
          <Select options={DATA_TYPE_MAP} placeholder="请选择类型" />
        </Item>
        <Item<FormData> label="数据源名称" required name="name">
          <Input placeholder="请输入数据源名称" />
        </Item>
        <Item<FormData> label="JDBC URL" required name="jdbc">
          <Input.TextArea rows={5} placeholder="请输入jdbc url" />
        </Item>
        <Item<FormData> label="用户名" required name="username">
          <Input placeholder="请输入用户名" />
        </Item>
        <Item<FormData> label="密码" required name="password">
          <Input.Password placeholder="请输入密码" />
        </Item>
        <Item<FormData> label="备注" name="memo">
          <Input placeholder="请输入备注" />
        </Item>
      </Form>
    </Modal>
  );
});

export default EditModal;
