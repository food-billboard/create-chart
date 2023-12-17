import { useMemo } from 'react';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
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
    style: { left = 0, top = 0 } = {},
  } = nextProps;
  const { show, showComponentId } = debug;

  const showIdElement = useMemo(() => {
    if (showComponentId && show && screenType === 'edit') {
      return (
        <div
          className={styles['render-wrapper-show-id']}
          style={{
            left,
            top,
          }}
        >
          {id}
        </div>
      );
    }
    return null;
  }, [showComponentId, show, screenType, left, top]);

  return (
    <>
      {showIdElement}
      <Component {...nextProps} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowIdWrapper);
