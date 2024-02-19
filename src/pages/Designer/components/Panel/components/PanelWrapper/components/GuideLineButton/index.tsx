import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useScroll } from 'ahooks';
import { Button } from 'antd';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import Tooltip from '@/components/Tooltip';
import { ConnectState } from '@/models/connect';
import { wrapperId } from '../../constants';
import styles from './index.less';

const GuideLineButton = (props: {
  show: boolean;
  onClick?: any;
  setGuideLine: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const { show, onClick, setGuideLine } = props;

  const { left, top } = useScroll(document.querySelector(`#${wrapperId}`)) || {
    left: 0,
    top: 0,
  };

  const guideLineShowIcon = useMemo(() => {
    return show ? <EyeOutlined /> : <EyeInvisibleOutlined />;
  }, [show]);

  const deleteGuideLine = useCallback(async () => {
    setGuideLine({
      show,
      value: [],
    });
  }, [show, setGuideLine]);

  const title = useMemo(() => {
    return (
      <>
        <GlobalLoadingActonButton
          onClick={deleteGuideLine}
          icon={<DeleteOutlined />}
          type="link"
          title="删除所有辅助线"
          className={styles['designer-page-main-guide-btn-sub']}
        />
      </>
    );
  }, []);

  return (
    <Tooltip title={title}>
      <Button
        onClick={onClick}
        type="link"
        className={styles['designer-page-main-guide-btn']}
        style={{
          left,
          top,
        }}
        icon={guideLineShowIcon}
      ></Button>
    </Tooltip>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      theme: state.global.screenData.config.attr.theme,
    };
  },
  () => ({}),
)(GuideLineButton);
