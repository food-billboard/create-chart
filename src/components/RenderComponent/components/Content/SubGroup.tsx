import { ReactNode, useRef } from 'react';
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
  screenTheme: string;
  [key: string]: any;
}) => {
  const {
    children,
    value,
    className,
    isOuter = false,
    screenType,
    screenTheme,
  } = props;
  const {
    id,
    config: { options },
  } = value;
  const { condition } = options as any;

  const requestRef = useRef<TFetchFragmentRef>(null);

  const childrenStyle = useComponentChildrenStyle(value, {
    isOuter,
  });

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
  } = useCondition(onCondition);

  return (
    <>
      <div
        className={classnames(
          styles['render-component-wrapper-inner'],
          'pos-ab',
          className,
          conditionClassName,
        )}
        style={merge(childrenStyle, conditionStyle)}
      >
        {children}
      </div>
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
    </>
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
