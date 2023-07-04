import { useEffect } from 'react';
import {
  presetRegisterEvent,
  presetUnRegisterEvent,
} from '@/utils/Assist/EventEmitter/PresetEmit';

// 事件订阅
const EventEmitWrapper = (props: any) => {
  const { Component, ...nextProps } = props;
  useEffect(() => {
    presetRegisterEvent();
    return presetUnRegisterEvent;
  }, []);

  return <Component {...nextProps} />;
};

export default EventEmitWrapper;
