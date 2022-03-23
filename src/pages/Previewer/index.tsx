import { useEffect, useState } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import { previewScreenValid } from '@/services';
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

  const fetchValid = async () => {
    const { id } = history.location.query || {};
    if (!id) return;
    try {
      const result = await previewScreenValid({
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
