import { Form, Input } from 'antd';
import { useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import Modal from '../../../FocusModal';

export type FeedBackRef = {
  open: () => void;
};

export type FeedBackProps = {};

const FeedBackModal = forwardRef<FeedBackRef, FeedBackProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm<{
    description: string;
  }>();

  const open = () => {
    setVisible(true);
    form.resetFields();
  };

  const close = () => setVisible(false);

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        // TODO
        console.log(values);
      })
      .catch((err) => {});
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
    <Modal open={visible} title="问题反馈" onCancel={close} onOk={handleOk}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item
          name="description"
          label="问题描述"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="请描述您的问题！" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default FeedBackModal;
