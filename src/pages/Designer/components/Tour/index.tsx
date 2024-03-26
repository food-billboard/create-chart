import type { TourStepProps } from 'antd';
import Tour, { Props } from '@/components/Tour';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { LocalConfig } from '@/utils/Assist/LocalConfig';

const steps: TourStepProps[] = [
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
  ...(GlobalConfig.IS_STATIC
    ? ([
        {
          title: '如果完成的大屏数据可点击按钮优先进行导入(*￣︶￣)',
          target: () => document.querySelector('#static-import-button')!,
          placement: 'left',
        },
      ] as TourStepProps[])
    : []),
];

const ShepherdWrapper = (props: Partial<Props>) => {
  return (
    <Tour
      {...props}
      tourUniqueKey="DESIGNER_GUIDE"
      steps={steps}
      localKey={LocalConfig.CONFIG_KEY_SHEPHERD_INFO}
    />
  );
};

export default ShepherdWrapper;
