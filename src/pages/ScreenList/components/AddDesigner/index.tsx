import { Button, Modal, Form, Input, App, Select } from 'antd';
import { useCallback, useState, useMemo } from 'react';
import { postScreen, postScreenModel } from '@/services';
import ThemeUtil from '@/utils/Assist/Theme';
import { createScreenDataRequest } from '@/utils/constants/screenData';
import { goDesign, goDesignModel } from '@/utils/tool';

const { Item, useForm } = Form;

const AddDesigner = (props: { type: 'screen' | 'model' }) => {
  const { type } = props;

  const { message } = App.useApp();

  const [form] = useForm();

  const [visible, setVisible] = useState<boolean>(false);

  const title = useMemo(() => {
    return type === 'screen' ? '大屏' : '大屏模板';
  }, [type]);

  const requestMethod = useMemo(() => {
    return type === 'screen' ? postScreen : postScreenModel;
  }, [type]);

  const goLink = useMemo(() => {
    return type === 'screen' ? goDesign : goDesignModel;
  }, [type]);

  const handleAdd = useCallback(async () => {
    let name;
    let flag;

    try {
      const result = await form.validateFields(['name', 'flag']);
      name = result.name;
      flag = result.flag;
    } catch (err) {
      return;
    }

    try {
      // 初始化大屏数据
      const params = createScreenDataRequest({
        name,
        flag,
      });
      const result = await requestMethod(params as any);
      goLink(result as string);
      setVisible(false);
      form.resetFields();
    } catch (err) {
      message.info(`创建${title}失败`);
    }
  }, [requestMethod, title, goLink]);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        新建
      </Button>
      <Modal
        title={title + '设置'}
        open={visible}
        onCancel={setVisible.bind(null, false)}
        onOk={handleAdd}
      >
        <Form
          form={form}
          initialValues={{
            theme: ThemeUtil.currentTheme,
          }}
        >
          <Item
            label={`${title}名称`}
            name="name"
            validateTrigger={false}
            rules={[
              {
                required: true,
                message: `请输入${title}名称`,
              },
              {
                type: 'string',
                min: 6,
                message: `最少6个字`,
              },
            ]}
          >
            <Input placeholder={`请输入${title}名称`} />
          </Item>
          <Item label="平台" name="flag" initialValue={'PC'}>
            <Select
              className="w-100"
              options={[
                {
                  label: '电脑端',
                  value: 'PC',
                },
                {
                  label: '移动端',
                  value: 'H5',
                },
              ]}
            />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDesigner;
