import classnames from 'classnames';
import { merge } from 'lodash';
import { CSSProperties, ReactNode, useMemo } from 'react';
import { connect } from 'umi';
import {
  useCondition,
  useGroupComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import { useComponentChildrenStyle } from '@/hooks';
import { ConnectState } from '@/models/connect';
import styles from '../../../index.less';
import CarouselGroupWrapper from './CarouselGroupWrapper';

const SubGroup = (props: {
  children?: ReactNode;
  value: ComponentData.TComponentData;
  isOuter?: boolean;
  screenType: ComponentData.ScreenType;
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
      style: { border, groupCarousel },
    },
  } = value;
  const { condition } = options as any;
  const transform: ComponentData.TGroupComponentTransformConfig = (
    options as any
  ).transform;

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

  const { onCondition } = useGroupComponent<any>({
    component: value,
    global: {
      setParams: () => {},
      screenType,
      screenTheme: screenTheme.value,
    },
  });

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
          {groupCarousel?.show ? (
            <CarouselGroupWrapper
              children={children}
              groupCarousel={groupCarousel}
            />
          ) : (
            children
          )}
        </div>
      </Wrapper>
      <FetchFragment
        id={id}
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
