import { Tour } from 'antd';
import type { TourProps } from 'antd';
import { useEffect, useState, useCallback, useRef } from 'react';
import { connect } from 'umi';
import { useLocalStorage } from '@/hooks';
import { mapDispatchToProps, mapStateToProps } from './connect';
import './index.less';

export type Props = TourProps & {
  onStart?: () => void;
  onComplete?: () => void;
  loading?: boolean;
  expire?: number;
  tourUniqueKey: string;
  localKey: string;
  userId: string;
};

const ShepherdWrapper = (props: Props) => {
  const {
    onStart,
    onComplete,
    loading,
    userId,
    expire = 1000 * 60 * 60 * 24 * 30,
    tourUniqueKey,
    localKey,
    ...nextProps
  } = props;
  const [open, setOpen] = useState(false);

  const tourDoneRef = useRef(false);

  // 缓存中是否存在
  const [value = {}, setValue, _, initialDone] = useLocalStorage<{
    [key: string]: {
      timestamps: number;
    };
  }>(localKey, {});

  const close = useCallback(() => {
    onComplete?.();
    setOpen(false);
  }, [onComplete]);

  useEffect(() => {
    if (tourDoneRef.current || !initialDone || loading) return;
    // ? 静态版本没有登录,
    const key = `${userId || 'TOUR_STATIC_MOCK_USER_ID'}_${tourUniqueKey}`;
    const target = value?.[key];
    const current = Date.now();
    if (!target || current - target.timestamps > expire) {
      onStart?.();
      setOpen(true);
    }
    tourDoneRef.current = true;
    value[key] = {
      timestamps: Date.now(),
    };
    setValue(value);
  }, [value, initialDone, loading]);

  return <Tour {...nextProps} onClose={close} onFinish={close} open={open} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShepherdWrapper);
