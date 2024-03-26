import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { message } from '@/components/Message';
import { useHashChangeReload } from '@/hooks';
import { getPageQuery } from '@/utils/tool';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PainterWrapper from '../Share/components/PainterWrapper';
import useWrapperProps from '../Share/useWrapperProps';
import ScreenDataUpload from './components/ScreenDataUpload';
import { mapDispatchToProps, mapStateToProps } from './connect';

const { skipUpload } = getPageQuery();
const SKIP_UPLOAD = skipUpload === '1';

function Viewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
  flag: ComponentData.ScreenFlagType;
  scale: ComponentData.ScreenScaleType;
}) {
  const {
    setScreenType,
    width,
    height,
    setScale,
    flag,
    scale: scaleConfig,
  } = props;

  const [prepareLoading, setPrepareLoading] = useState(true);

  const { scale, ...wrapperProps } = useWrapperProps({
    containerWidth: width,
    containerHeight: height,
    setScale,
    flag,
    scale: scaleConfig,
    bodyCalculate: !prepareLoading && SKIP_UPLOAD,
  });

  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'prod' && SKIP_UPLOAD) {
      message.warning(
        `链接中存在'skipUpload'表示将使用本地数据加载大屏内容，请确认是否为正确意图，否则请删除该查询条件后刷新页面！`,
        5,
        () => {
          setPrepareLoading(false);
        },
      );
    } else {
      setPrepareLoading(false);
    }
  }, []);

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  useHashChangeReload(() => {});

  if (prepareLoading) return null;

  // 优先展示文件上传
  if (!SKIP_UPLOAD) {
    return <ScreenDataUpload />;
  }

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent fetchScreenShot />
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
