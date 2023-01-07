import { useMemo, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useFullscreen } from 'ahooks';
import ColorSelect from '@/components/ColorSelect';
import { TFullScreenConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const FullScreen = (
  props: ComponentData.CommonComponentProps<TFullScreenConfig>,
) => {
  const { className, style, value, children, global, wrapper: Wrapper } = props;
  const { screenType } = global;

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(
    document.documentElement,
  );

  const {
    config: {
      options,
      style: { border },
    },
  } = value;
  const { icon, backgroundColor, borderRadius } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const onClick = () => {
    screenType !== 'edit' && toggleFullscreen();
  };

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-interactive-full-screen'],
    );
  }, [className]);

  const iconNode = useMemo(() => {
    return (
      <div
        style={{
          backgroundColor: getRgbaString(backgroundColor),
          borderRadius: `${borderRadius}%`,
        }}
        className="w-100 h-100"
      >
        <div className="w-100 h-100">
          <img
            className="pos-re w-100 h-100"
            src={isFullscreen ? icon.quit : icon.enter}
            alt={isFullscreen ? '退出全屏' : '全屏显示'}
          />
        </div>
      </div>
    );
  }, [icon, isFullscreen, borderRadius, backgroundColor]);

  return (
    <div
      className={componentClassName}
      style={merge(
        {
          width: '100%',
          height: '100%',
        },
        style,
      )}
      id={chartId.current}
      onClick={onClick}
    >
      <Wrapper border={border}>
        {children}
        <div
          className={classnames(
            'w-100 h-100',
            chartId.current,
            styles['component-interactive-full-screen-main'],
          )}
        >
          {iconNode}
        </div>
      </Wrapper>
    </div>
  );
};

const WrapperFullScreen: typeof FullScreen & {
  id: ComponentData.TComponentSelfType;
} = FullScreen as any;

WrapperFullScreen.id = CHART_ID;

export default WrapperFullScreen;
