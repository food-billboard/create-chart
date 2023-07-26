import type { ConnectState } from '@/models/connect';
import { useMemo } from 'react';
import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const ShowIdWrapper = (
  props: { [key: string]: any } & {
    debug: ConnectState['local']['debug'];
    screenType: ComponentData.ScreenType;
  },
) => {
  const { Component, debug, screenType, ...nextProps } = props;
  const {
    value: { id },
  } = nextProps;
  const { show, showComponentId } = debug;

  const showIdElement = useMemo(() => {
    if (showComponentId && show && screenType === 'edit') {
      return <div className={styles['render-wrapper-show-id']}>{id}</div>;
    }
    return null;
  }, [showComponentId, show, screenType]);

  return (
    <>
      {showIdElement}
      <Component {...nextProps} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowIdWrapper);
