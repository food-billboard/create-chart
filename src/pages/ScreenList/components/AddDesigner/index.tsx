import { useCallback, useState, useMemo } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { merge } from 'lodash';
import { postScreen, postScreenModel } from '@/services';
import { goDesign, goDesignModel } from '@/utils/tool';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import DEFAULT_SCREEN_DATA from '@/utils/constants/screenData';
import ThemeUtil from '@/utils/Assist/Theme';
import { BaseThemeConfig } from '../../../Designer/components/RightContent/components/GlobalConfig/components/ThemeConfig';

const { Item, useForm } = Form;

const AddDesigner = (props: { type: 'screen' | 'model' }) => {
  const { type } = props;

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
    let theme;

    try {
      const result = await form.validateFields(['name', 'theme']);
      name = result.name;
      theme = result.theme;
    } catch (err) {
      return;
    }

    try {
      // 初始化大屏数据
      const params = {
        name,
        description: '',
        poster: GlobalConfig.DEFAULT_SCREEN_COVER,
        flag: 'PC' as any,
        data: JSON.stringify(
          merge({}, DEFAULT_SCREEN_DATA, {
            name,
            poster: GlobalConfig.DEFAULT_SCREEN_COVER,
            config: {
              attr: {
                theme,
              },
            },
          }),
        ),
      };
      const result = await requestMethod(params);
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
          {/* <Item label="色调" name="theme">
            <BaseThemeConfig />
          </Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddDesigner;
