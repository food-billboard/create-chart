import { ReactNode, useMemo } from 'react';
import { Empty } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import IsMobile from 'is-mobile';
import { useSize } from 'ahooks';
import { ConnectState } from '@/models/connect';
import styles from '../../index.less';

const isMobile = IsMobile();

function PainterWrapper(props: {
  flag: ComponentData.ScreenFlagType;
  scale: number;
  children?: ReactNode;
}) {
  const { flag, children, scale } = props;

  const { height = 0 } =
    useSize(() => document.querySelector('.page-preview-container')) || {};

  if (isMobile && flag === 'PC') {
    return (
      <Empty
        description="请在电脑端使用"
        style={{
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    );
  }

  if (!isMobile && flag === 'H5') {
    return (
      <Empty
        description="请在手机端使用"
        style={{
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    );
  }

  if (flag === 'H5') {
    return (
      <div
        className={classnames(
          'w-100 h-100 zero-scrollbar',
          styles['page-preview-h5-wrapper'],
        )}
      >
        <div
          className="w-100"
          style={{
            height: height * scale,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default connect(
  (state: ConnectState) => {
    return {
      flag: state.global.screenData.config.flag.type,
    };
  },
  () => ({}),
)(PainterWrapper);
