import { useEffect, useState } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import { previewScreenValid, previewScreenModelValid } from '@/services';
import { useIsModelHash, useHashChangeReload } from '@/hooks';
import useResize from '../Share/useResize';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

function Previewer(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
  width: number;
  height: number;
  setScale: (value: number) => void;
}) {
  const { setScreenType, width, height, setScale } = props;

  const [needFetch, setNeedFetch] = useState<boolean>(false);

  const isModel = useIsModelHash();

  const fetchValid = async () => {
    const { id } = history.location.query || {};
    if (!id) return;
    try {
      console.log(isModel, 2222);
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

  const scale = useResize(width, height, setScale);

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  useEffect(() => {
    fetchValid();
  }, []);

  return (
    <>
      <NormalPainter
        className={styles['page-preview']}
        style={{
          transform: `scale(${scale}) translateX(-50%)`,
        }}
      />
      <FetchScreenComponent needFetch={needFetch} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Previewer);
