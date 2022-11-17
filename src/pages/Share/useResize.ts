import { useMemo, useEffect, useState } from 'react';
import { sleep } from '@/utils';

const useResize = (
  containerWidth: number,
  containerHeight: number,
  setScale: (value: number) => void,
  flag: ComponentData.ScreenFlagType = 'PC',
) => {
  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 1920, height: 1080 });

  const resize = () => {
    const dom = document.querySelector('#root');
    if (!dom) return;
    const width = dom.clientWidth;
    const height = dom.clientHeight;
    setSize({
      width,
      height,
    });
  };

  const scale = useMemo(() => {
    const xScale = width / containerWidth;
    const yScale = height / containerHeight;
    return flag === 'H5' ? xScale : yScale;
  }, [width, height, containerWidth, containerHeight, flag]);

  useEffect(() => {
    sleep(1000).then(resize);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    setScale(scale * 100);
  }, [scale, setScale]);

  return scale;
};

export default useResize;
