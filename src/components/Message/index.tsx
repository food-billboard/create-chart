import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI } from 'antd/es/modal/useModal';
import type { NotificationInstance } from 'antd/es/notification/interface';

export let message: MessageInstance;
export let notification: NotificationInstance;
export let modal: HookAPI;

const Message = () => {
  const {
    message: _message,
    notification: _notification,
    modal: _modal,
  } = App.useApp();

  message = _message;
  notification = _notification;
  modal = _modal;

  return <></>;
};

export default Message;
