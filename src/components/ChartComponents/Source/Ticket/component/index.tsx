import { useComponentSize } from '@/components/ChartComponents/Common/Component/hook';
import ColorSelect from '@/components/ColorSelect';
import { ConnectState } from '@/models/connect';
import classnames from 'classnames';
import { get, merge, uniqueId } from 'lodash';
import { useMemo, useRef } from 'react';
import { connect } from 'umi';
import { CHART_ID } from '../id';
import { TTicketConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Ticket = (
  props: ComponentData.CommonComponentProps<TTicketConfig> & {
    componentBorder: ComponentData.TScreenData['config']['attr']['componentBorder'];
  },
) => {
  const {
    className,
    style,
    value,
    children,
    global,
    wrapper: Wrapper,
    componentBorder: { width: borderWidth, padding },
  } = props;

  const {
    config: {
      options,
      style: { border, width, height },
    },
  } = value;
  const {
    dashed: { show, color },
    length,
    radius,
    shadow,
    color: backgroundColor,
  } = options;
  const realBackgroundColor = getRgbaString(backgroundColor);

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const { width: componentWidth, height: componentHeight } = useComponentSize(
    `.${chartId.current}`,
    { width, height },
    [width, height, borderWidth, padding],
  );

  const componentClassName = useMemo(() => {
    return classnames(className, 'dis-flex', styles['component-source-ticket']);
  }, [className]);

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
    >
      <Wrapper border={border}>
        {children}
        <div
          className={classnames(
            'w-100 h-100',
            styles['component-source-ticket-main'],
            {
              [styles['component-source-ticket-main-with-line']]: show,
            },
            chartId.current,
          )}
          style={{
            // @ts-ignore
            '--component-source-ticket-line-size':
              componentHeight - radius * 2 + 'px',
            '--component-source-ticket-line-color': getRgbaString(color),
            '--component-source-ticket-line-left': length + 'px',
            ...(shadow.show
              ? {
                  filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,.2))',
                }
              : {}),
            background: `radial-gradient(circle at right top, transparent ${radius}px, ${realBackgroundColor} 0) top left / ${length}px 51% no-repeat,
            radial-gradient(circle at right bottom, transparent ${radius}px, ${realBackgroundColor} 0) bottom left /${length}px 51% no-repeat,
            radial-gradient(circle at left top, transparent ${radius}px, ${realBackgroundColor} 0) top right /${
              componentWidth - length
            }px 51% no-repeat,
            radial-gradient(circle at left bottom, transparent ${radius}px, ${realBackgroundColor} 0) bottom right /${
              componentWidth - length
            }px 51% no-repeat`,
          }}
        ></div>
      </Wrapper>
    </div>
  );
};

const WrapperTicket: typeof Ticket & {
  id: ComponentData.TComponentSelfType;
} = Ticket as any;

WrapperTicket.id = CHART_ID;

export default connect(
  (state: ConnectState) => {
    return {
      componentBorder: get(
        state,
        'global.screenData.config.attr.componentBorder',
      ),
    };
  },
  () => ({}),
)(WrapperTicket);
