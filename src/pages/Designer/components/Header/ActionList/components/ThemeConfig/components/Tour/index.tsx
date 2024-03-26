import type { TourProps } from 'antd';
import { Typography } from 'antd';
import Tour, { Props } from '@/components/Tour';
import { LocalConfig } from '@/utils/Assist/LocalConfig';

const { Paragraph } = Typography;

const steps: TourProps['steps'] = [
  {
    title: '设置当前大屏的主题色',
    target: () => document.querySelector('#designer-theme-config')!,
    placement: 'right',
  },
  {
    title: '内置的主题',
    target: () => document.querySelector('#designer-theme-config-internal')!,
    placement: 'right',
  },
  {
    title: '自定义主题',
    target: () => document.querySelector('#designer-theme-config-custom')!,
    placement: 'right',
  },
  {
    title: '选择图片来生成一组新的主题色',
    target: () =>
      document.querySelector('#designer-theme-config-custom-upload')!,
    placement: 'right',
  },
  {
    title: '可以操作修改主题的名称、颜色以及删除',
    target: () => document.querySelector('#designer-theme-config-edit')!,
    placement: 'right',
  },
  {
    title: (
      <>
        名称可用于实际预览时，通过大屏预览地址进行动态修改主题
        <Paragraph code>http://xxxxx.com?theme=custom_theme_name_1</Paragraph>
        {'-->'}
        <Paragraph code>http://xxxxx.com?theme=custom_theme_name_2</Paragraph>
      </>
    ),
    target: () => document.querySelector('#designer-theme-config-edit')!,
    placement: 'top',
  },
];

const ShepherdWrapper = (props: Partial<Props>) => {
  return (
    <Tour
      {...props}
      tourUniqueKey="THEME_CONFIG_GUIDE"
      steps={steps}
      localKey={LocalConfig.CONFIG_KEY_SHEPHERD_THEME_CONFIG_INFO}
    />
  );
};

export default ShepherdWrapper;
