import { useCallback, useRef } from 'react';
import { Button } from 'antd';
import { MobileOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import MobilePreviewer, {
  MobilePreviewerRef,
} from './components/MobilePreviewer';
import { mapDispatchToProps, mapStateToProps } from './connect';

const ExchangeButton = ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const ref = useRef<MobilePreviewerRef>(null);

  const handleClick = useCallback(() => {
    ref.current?.open();
  }, [setLoading, setLoading]);

  return (
    <>
      <Button
        key="exchange"
        size="large"
        title="切换为移动端"
        type="link"
        onClick={handleClick}
        icon={<MobileOutlined />}
        loading={loading}
      ></Button>
      <MobilePreviewer ref={ref} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeButton);
