import { useEffect, useState, useRef, useCallback } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { observer } from 'mobx-react-lite';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { useHashChangeReload, useMobxContext } from '@/hooks';
import {
  shareScreenHeartbeat,
  shareScreenGet,
  shareScreenPost,
} from '@/services';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PasswordConfirm, {
  PasswordConfirmRef,
} from './components/PasswordConfirm';
import PainterWrapper from './components/PainterWrapper';
import useWrapperProps from './useWrapperProps';
import WaterMark from './components/WaterMark';

function Share() {
  const {
    global: {
      setScreenType,
      setScale,
      screenData: {
        config: {
          style: { width, height },
          flag: { type: flag },
          attr: { scale: scaleConfig },
        },
      },
    },
  } = useMobxContext();

  const [needFetch, setNeedFetch] = useState<boolean>(false);
  const [heartbeat, setHeartbeat] = useState<boolean>(true);

  const passwordConfirmRef = useRef<PasswordConfirmRef>(null);
  const timerRef = useRef<any>();

  const { scale, ...wrapperProps } = useWrapperProps({
    containerWidth: width,
    containerHeight: height,
    setScale,
    flag,
    scale: scaleConfig,
  });

  const heartbeatFetch = async () => {
    try {
      const { id } = history.location.query || {};
      const result = await shareScreenHeartbeat({ _id: id as string });
      if (!result) {
        setHeartbeat(false);
        message.info('分享时间过期');
      }
    } catch (err) {
      setHeartbeat(false);
      message.info('网络错误，请刷新页面重试');
    }
  };

  const intervalHeartbeat = async () => {
    clearInterval(timerRef.current);
    let loading = true;
    await heartbeatFetch();
    timerRef.current = setInterval(async () => {
      if (loading) return;
      loading = true;
      await heartbeatFetch();
      loading = false;
    }, 10 * 1000);
  };

  const fetchValidInfo = async () => {
    const { id } = history.location.query || {};
    if (!id) return;
    try {
      const { password } = await shareScreenGet({ _id: id as string });
      if (password) {
        passwordConfirmRef.current?.open();
      } else {
        setNeedFetch(true);
        await intervalHeartbeat();
      }
    } catch (err) {
      message.info('信息获取失败');
    }
  };

  const onPasswordConfirm = useCallback(async (value) => {
    const { id } = history.location.query || {};
    const data = await shareScreenPost({
      _id: id as string,
      password: value,
    });
    if (data) {
      await intervalHeartbeat();
      setNeedFetch(true);
    }
    return !!data;
  }, []);

  const reload = async () => {
    setNeedFetch(false);
    fetchValidInfo();
  };

  useHashChangeReload(reload);

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  useEffect(() => {
    fetchValidInfo();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <PainterWrapper scale={scale}>
      {heartbeat && <NormalPainter {...wrapperProps} />}
      <FetchScreenComponent needFetch={needFetch} />
      <PasswordConfirm ref={passwordConfirmRef} onOk={onPasswordConfirm} />
      <WaterMark />
    </PainterWrapper>
  );
}

export default observer(Share);
