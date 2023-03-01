import { CSSProperties, useMemo, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import ColorSelect from '@/components/ColorSelect';
import { useComponentSize } from '@/components/ChartComponents/Common/Component/hook';
import { useLinkageInteractive } from '@/components/ChartComponents/Common/Component/hook/useLinkageInteractive';
import { TIconConfig } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Icon = observer(
  (props: ComponentData.CommonComponentProps<TIconConfig>) => {
    const {
      className,
      style,
      value,
      children,
      global,
      wrapper: Wrapper,
    } = props;
    const { screenType } = global;

    const {
      global: {
        screenData: {
          config: {
            attr: {
              componentBorder: { width: borderWidth, padding },
            },
          },
        },
      },
    } = useMobxContext();

    const {
      config: {
        options,
        style: { width, height, border },
        interactive: { linkage = [] } = {},
      },
    } = value;
    const { color, value: iconValue } = options;

    const chartId = useRef<string>(uniqueId(CHART_ID));

    const linkageMethod = useLinkageInteractive(linkage);

    const { width: componentWidth, height: componentHeight } = useComponentSize(
      `.${chartId.current}`,
      { width, height },
      [width, height, borderWidth, padding],
    );

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
            fontSize: Math.min(componentWidth, componentHeight) + 'px',
          }}
        />
      );
    }, [iconValue, componentWidth, componentHeight]);

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
        <Wrapper border={border}>
          {children}
          <div className={classnames('w-100 h-100', chartId.current)}>
            {iconNode}
          </div>
        </Wrapper>
      </div>
    );
  },
);

const WrapperIcon: typeof Icon & {
  id: ComponentData.TComponentSelfType;
} = Icon as any;

WrapperIcon.id = CHART_ID;

export default WrapperIcon;
