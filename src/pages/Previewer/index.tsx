import { useEffect, useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { previewScreenValid, previewScreenModelValid } from '@/services';
import { useIsModelHash, useHashChangeReload, useMobxContext } from '@/hooks';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import useWrapperProps from '../Share/useWrapperProps';
import PainterWrapper from '../Share/components/PainterWrapper';
import WaterMark from '../Share/components/WaterMark';

function Previewer() {
  const {
    global: {
      setScreenType,
      setScale,
      screenData: {
        config: {
          style: { width, height },
          flag: { type: flag },
          attr: { scale: scaleConfig },
        },
      },
    },
  } = useMobxContext();

  const [needFetch, setNeedFetch] = useState<boolean>(false);

  const isModel = useIsModelHash();

  const fetchValid = async () => {
    const { id } = history.location.query || {};
    if (!id) return;
    try {
      const method = isModel ? previewScreenModelValid : previewScreenValid;
      const result = await method({
        _id: id as string,
      });
      if (!result) {
        message.info('无访问权限');
      } else {
        setNeedFetch(true);
      }
    } catch (err) {
      message.info('操作失败');
    }
  };

  const reload = async () => {
    setNeedFetch(false);
    await fetchValid();
  };

  useHashChangeReload(reload);

  const { scale, ...wrapperProps } = useWrapperProps({
    containerWidth: width,
    containerHeight: height,
    setScale,
    flag,
    scale: scaleConfig,
  });

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  useEffect(() => {
    fetchValid();
  }, []);

  return (
    <PainterWrapper scale={scale}>
      <NormalPainter {...wrapperProps} />
      <FetchScreenComponent needFetch={needFetch} />
      <WaterMark />
    </PainterWrapper>
  );
}

export default Previewer;
