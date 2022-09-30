import { CSSProperties, useMemo, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import ColorSelect from '@/components/ColorSelect';
import { useLinkageInteractive } from '@/components/ChartComponents/Common/Component/hook/useLinkageInteractive';
import { TIconConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'ICON';

const Icon = (props: ComponentData.CommonComponentProps<TIconConfig>) => {
  const { className, style, value, children, global, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    config: {
      options,
      style: { width, height },
      interactive: { linkage = [] } = {},
    },
  } = value;
  const { color, value: iconValue } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const linkageMethod = useLinkageInteractive(linkage);

  const onClick = () => {
    screenType !== 'edit' && linkageMethod('click', {});
  };

  const componentStyle = useMemo(() => {
    let baseStyle: CSSProperties = {
      color: getRgbaString(color),
    };
    return baseStyle;
  }, [color]);

  const componentClassName = useMemo(() => {
    return classnames(className, 'dis-flex', styles['component-font-icon']);
  }, [className]);

  const iconNode = useMemo(() => {
    return (
      <span
        className={classnames('bi', iconValue)}
        style={{
          fontSize: Math.min(width, height) + 'px',
        }}
      />
    );
  }, [iconValue, width, height]);

  return (
    <div
      className={componentClassName}
      style={merge(
        {
          width: '100%',
          height: '100%',
        },
        style,
        componentStyle,
      )}
      id={chartId.current}
      onClick={onClick}
    >
      <Wrapper>
        {children}
        {iconNode}
      </Wrapper>
    </div>
  );
};

const WrapperIcon: typeof Icon & {
  id: ComponentData.TComponentSelfType;
} = Icon as any;

WrapperIcon.id = CHART_ID;

export default WrapperIcon;
