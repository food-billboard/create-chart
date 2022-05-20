import { ReactNode, useContext, useEffect } from 'react';
import {
  ShepherdTour,
  ShepherdTourContext,
  ShepherdOptionsWithType,
} from 'react-shepherd';
import { connect } from 'dva';
import { useLocalStorage } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import './index.less';

const steps: ShepherdOptionsWithType[] = [
  {
    id: 'screen_name',
    text: [
      `
        <p>
          设置可视化大屏的名称，最少5个字。
        </p>
      `,
    ],
    attachTo: {
      element: '.ant-page-header-heading-title',
      on: 'right',
    },
    buttons: [
      {
        type: 'cancel',
        classes: 'shepherd-button-secondary',
        text: '退出',
      },
      {
        type: 'next',
        text: '下一步',
      },
    ],
  },
  {
    id: 'component_list',
    text: [
      `
        <p>
          大屏的各个组件列表，选择组件拖动到画布中。
        </p>
      `,
    ],
    attachTo: {
      element: '.design-left-component-list',
      on: 'right',
    },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: '上一步',
      },
      {
        type: 'next',
        text: '下一步',
      },
    ],
  },
  {
    id: 'tool_bar',
    text: [
      `
        <p>
          辅助操作大屏的工具栏，包括前进后退，组件列表，辅助线，过滤函数，全局常量和本地配置。
        </p>
      `,
    ],
    attachTo: {
      element: '.page-design-left-tool-bar',
      on: 'right',
    },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: '上一步',
      },
      {
        type: 'next',
        text: '下一步',
      },
    ],
  },
  {
    id: 'panel',
    text: [
      `
        <p>
          设计器的画布部分，将组件拖拽至画布当中，配合左和上方辅助线，完成设计，即为最终大屏的展现效果。
        </p>
      `,
    ],
    attachTo: {
      element: '#designer-page-main-sub',
      on: 'auto',
    },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: '上一步',
      },
      {
        type: 'next',
        text: '下一步',
      },
    ],
  },
  {
    id: 'config',
    text: [
      `
        <p>
          大屏组件及全局的配置区域。
        </p>
        <p>
          不选中组件的情况下，显示的即为全局配置，比如设置他的画布大小，封面等。
        </p>
        <p>
          选中组件或组时，即可对对应组件或组设置对应的样式以及数据和交互等。
        </p>
      `,
    ],
    attachTo: {
      element: '.design-page-right',
      on: 'left',
    },
    buttons: [
      {
        type: 'back',
        classes: 'shepherd-button-secondary',
        text: '上一步',
      },
      {
        type: 'next',
        text: '知道了',
      },
    ],
  },
];

let SHEPHERD_DONE = false;

const Internal = (props: { children?: ReactNode; userId: string }) => {
  const { children, userId } = props;

  const tour = useContext(ShepherdTourContext);

  // 缓存中是否存在
  const [value = {}, setValue, initialDone] = useLocalStorage<{
    [key: string]: {
      timestamps: number;
    };
  }>(LocalConfig.CONFIG_KEY_SHEPHERD_INFO, {});

  useEffect(() => {
    if (SHEPHERD_DONE || !initialDone) return;
    const target = value?.[userId];
    const current = Date.now();
    if (!target || current - target.timestamps > 1000 * 60 * 60 * 24 * 30) {
      tour?.start();
    }
    SHEPHERD_DONE = true;
    value[userId] = {
      timestamps: Date.now(),
    };
    setValue(value);
  }, [value, initialDone]);

  return <>{children}</>;
};

const InternalWrapper = connect(mapStateToProps, mapDispatchToProps)(Internal);

const ShepherdWrapper = (props: { children?: ReactNode }) => {
  const { children } = props;

  return (
    <ShepherdTour
      steps={steps}
      tourOptions={{
        confirmCancel: false,
        defaultStepOptions: {
          arrow: true,
          scrollTo: true,
        },
        exitOnEsc: true,
        keyboardNavigation: true,
        useModalOverlay: true,
      }}
    >
      <InternalWrapper>{children}</InternalWrapper>
    </ShepherdTour>
  );
};

export default ShepherdWrapper;
