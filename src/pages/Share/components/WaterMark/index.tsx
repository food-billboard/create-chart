import { useSize } from 'ahooks';
import { Watermark as AntWatermark } from 'antd';
import type { WatermarkProps } from 'antd';
import classnames from 'classnames';
import { connect } from 'umi';
import { PANEL_ID } from '@/utils/constants/another';
import watermarkLogo from '../../../../../public/logo.jpg';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const WaterMark = (
  props: {
    waterMark: boolean;
    screenType: ComponentData.ScreenType;
  } & WatermarkProps,
) => {
  const { waterMark, screenType, ...nextProps } = props;

  const { height = 0 } =
    useSize(() => document.querySelector(`#${PANEL_ID}`)) || {};

  if (!waterMark || screenType !== 'preview') return props.children || null;

  return (
    <AntWatermark
      image={watermarkLogo}
      style={{
        ...nextProps.style,
        height,
      }}
      className={classnames(props.className, styles['component-watermark'])}
      width={49.5}
      height={46.25}
      zIndex={1}
      content="Fool Design"
      gap={[150, 150]}
      {...nextProps}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WaterMark);
