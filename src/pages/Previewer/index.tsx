import { App } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';
import { useHashChangeReload, useIsModelHash } from '@/hooks';
import { previewScreenModelValid, previewScreenValid } from '@/services';
import { getLocationQuery } from '@/utils';
import FetchScreenComponent from '../Designer/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PainterWrapper from '../Share/components/PainterWrapper';
import useWrapperProps from '../Share/useWrapperProps';
import { mapDispatchToProps, mapStateToProps } from './connect';

function Previewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  flag: ComponentData.ScreenFlagType;
  setScale: (value: number) => void;
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

  const [needFetch, setNeedFetch] = useState<boolean>(false);

  const { message } = App.useApp();

  const isModel = useIsModelHash();

  const fetchValid = async () => {
    const { id } = getLocationQuery() || {};
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
      <FetchScreenComponent needFetch={needFetch} screenType="preview" />
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Previewer);
