import { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { useHashChangeReload } from '@/hooks';
import {
  shareScreenHeartbeat,
  shareScreenGet,
  shareScreenPost,
} from '@/services';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PasswordConfirm, {
  PasswordConfirmRef,
} from './components/PasswordConfirm';
import useResize from './useResize';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

function Share(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
}) {
  const { setScreenType, width, height, setScale } = props;

  const [needFetch, setNeedFetch] = useState<boolean>(false);
  const [heartbeat, setHeartbeat] = useState<boolean>(true);

  const passwordConfirmRef = useRef<PasswordConfirmRef>(null);
  const timerRef = useRef<any>();

  const scale = useResize(width, height, setScale);

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
    <>
      {heartbeat && (
        <NormalPainter
          className={styles['page-share']}
          style={{
            transform: `scale(${scale}) translateX(-50%)`,
          }}
        />
      )}
      <FetchScreenComponent needFetch={needFetch} />
      <PasswordConfirm ref={passwordConfirmRef} onOk={onPasswordConfirm} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);
