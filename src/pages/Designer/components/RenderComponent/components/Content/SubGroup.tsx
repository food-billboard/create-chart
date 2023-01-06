import { ReactNode, useRef, CSSProperties, useMemo } from 'react';
import classnames from 'classnames';
import { merge } from 'lodash';
import { connect } from 'dva';
import { useComponentChildrenStyle } from '@/hooks';
import {
  useCondition,
  useGroupComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import { ConnectState } from '@/models/connect';
import styles from '../../index.less';

const SubGroup = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  isOuter?: boolean;
  screenType: 'edit' | 'preview' | 'production';
  screenTheme: ComponentData.TScreenTheme;
  style?: CSSProperties;
  flag: ComponentData.ScreenFlagType;
  wrapper: any;
  [key: string]: any;
}) => {
  const {
    children,
    value,
    className,
    isOuter = false,
    screenType,
    screenTheme,
    style,
    flag,
    wrapper: Wrapper,
  } = props;
  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { condition } = options as any;
  const transform: ComponentData.TGroupComponentTransformConfig = (
    options as any
  ).transform;

  const requestRef = useRef<TFetchFragmentRef>(null);

  const childrenStyle = useComponentChildrenStyle(value, {
    isOuter,
  });

  // 组的景深配置
  const transformStyle: CSSProperties = useMemo(() => {
    if (!transform.show) return {};
    return {
      perspective: transform.perspective,
      perspectiveOrigin: transform.perspectiveOrigin
        .map((item) => `${item}px`)
        .join(' '),
    };
  }, [transform]);

  const { onCondition } = useGroupComponent<any>(
    {
      component: value,
      global: {
        setParams: () => {},
        screenType,
        screenTheme,
      },
    },
    requestRef,
  );

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  return (
    <div
      className={classnames(
        'w-100 h-100',
        conditionClassName,
        className,
        styles['render-component-wrapper-inner'],
      )}
      style={merge(childrenStyle, style || {}, conditionStyle, {
        position: flag === 'H5' ? 'relative' : 'absolute',
      })}
      data-id={id}
    >
      <Wrapper border={border}>
        <div
          className={classnames('pos-re w-100 h-100', className)}
          style={transformStyle}
        >
          {children}
        </div>
      </Wrapper>
      <FetchFragment
        id={id}
        ref={requestRef}
        reCondition={propsOnCondition}
        componentCondition={condition}
        componentFilter={[]}
        reFetchData={async () => {}}
        reGetValue={() => []}
        url=""
      />
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      screenType: state.global.screenType,
      screenTheme: state.global.screenData.config.attr.theme,
    };
  },
  (dispatch: any) => {
    return {};
  },
)(SubGroup);
