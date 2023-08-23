import { Tour } from 'antd';
import type { TourProps } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { connect } from 'umi';
import { useLocalStorage } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';
import './index.less';

const steps: TourProps['steps'] = [
  {
    title: '设置可视化大屏的名称，最少5个字',
    target: () => document.querySelector('.ant-page-header-heading-title')!,
    placement: 'right',
  },
  {
    title: '大屏的各个组件列表，选择组件拖动到画布中',
    target: () => document.querySelector('.design-left-component-list')!,
    placement: 'right',
  },
  {
    title:
      '辅助操作大屏的工具栏，包括前进后退，组件列表，辅助线，过滤函数，全局常量和本地配置。',
    target: () => document.querySelector('.page-design-left-tool-bar')!,
    placement: 'right',
  },
  {
    title:
      '设计器的画布部分，将组件拖拽至画布当中，配合左和上方辅助线，完成设计，即为最终大屏的展现效果。',
    target: () => document.querySelector('#designer-page-main-sub')!,
    placement: 'top',
  },
  {
    title: (
      <>
        <p>大屏组件及全局的配置区域。</p>
        <p>
          不选中组件的情况下，显示的即为全局配置，比如设置他的画布大小，封面等。
        </p>
        <p>
          选中组件或组时，即可对对应组件或组设置对应的样式以及数据和交互等。
        </p>
      </>
    ),
    target: () => document.querySelector('.design-page-right')!,
    placement: 'left',
  },
];

let SHEPHERD_DONE = false;

const ShepherdWrapper = (props: {
  onStart?: () => void;
  onComplete?: () => void;
  loading: boolean;
  userId: string;
}) => {
  const { onStart, onComplete, loading, userId } = props;
  const [open, setOpen] = useState(false);

  // 缓存中是否存在
  const [value = {}, setValue, initialDone] = useLocalStorage<{
    [key: string]: {
      timestamps: number;
    };
  }>(LocalConfig.CONFIG_KEY_SHEPHERD_INFO, {});

  const close = useCallback(() => {
    onComplete?.();
    setOpen(false);
  }, [onComplete]);

  useEffect(() => {
    if (SHEPHERD_DONE || !initialDone || loading) return;
    const target = value?.[userId];
    const current = Date.now();
    if (!target || current - target.timestamps > 1000 * 60 * 60 * 24 * 30) {
      onStart?.();
      setOpen(true);
    }
    SHEPHERD_DONE = true;
    value[userId] = {
      timestamps: Date.now(),
    };
    setValue(value);
  }, [value, initialDone, loading]);

  return <Tour steps={steps} onClose={close} onFinish={close} open={open} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShepherdWrapper);
