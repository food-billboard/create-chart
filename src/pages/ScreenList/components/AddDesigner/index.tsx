import { useCallback, useState, useMemo } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { postScreen, postScreenModel } from '@/services';
import { goDesign, goDesignModel } from '@/utils/tool';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import DEFAULT_SCREEN_DATA from '@/utils/constants/screenData';

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
    const name = form.getFieldValue('name');

    // 初始化大屏数据
    const params = {
      name,
      description: '',
      poster: GlobalConfig.DEFAULT_SCREEN_COVER,
      flag: 'PC' as any,
      data: JSON.stringify({
        ...DEFAULT_SCREEN_DATA,
        name,
        poster: GlobalConfig.DEFAULT_SCREEN_COVER,
      }),
    };

    try {
      const result = await requestMethod(params);
      goLink(result as string);
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
        visible={visible}
        onCancel={setVisible.bind(null, false)}
        onOk={handleAdd}
      >
        <Form form={form}>
          <Item label={`${title}名称`} name="name">
            <Input placeholder={`请输入${title}名称`} />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDesigner;
