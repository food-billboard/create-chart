import { MobileOutlined } from '@ant-design/icons';
import { useCallback, useRef } from 'react';
import { connect } from 'umi';
import GlobalLoadingActionButton from '@/components/GlobalLoadingActionButton';
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

  const handleClick = useCallback(async () => {
    ref.current?.open();
  }, []);

  return (
    <>
      <GlobalLoadingActionButton
        key="exchange"
        size="large"
        title="切换为移动端"
        type="link"
        onClick={handleClick}
        icon={<MobileOutlined />}
        loading={loading}
        needLoading={false}
        tooltip={{
          mouseLeaveDelay: 0.3,
          title: '切换移动端',
        }}
      ></GlobalLoadingActionButton>
      <MobilePreviewer ref={ref} />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeButton);
