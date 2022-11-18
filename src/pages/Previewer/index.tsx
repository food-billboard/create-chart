import { useEffect, useState } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import { previewScreenValid, previewScreenModelValid } from '@/services';
import { useIsModelHash, useHashChangeReload } from '@/hooks';
import useWrapperProps from '../Share/useWrapperProps';
import PainterWrapper from '../Share/components/PainterWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';

function Previewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  flag: ComponentData.ScreenFlagType;
  setScale: (value: number) => void;
}) {
  const { setScreenType, width, height, setScale, flag } = props;

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

  const { scale, ...wrapperProps } = useWrapperProps(
    width,
    height,
    setScale,
    flag,
  );

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
    </PainterWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Previewer);
