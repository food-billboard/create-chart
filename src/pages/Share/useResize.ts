import { useMemo, useEffect, useState } from 'react';
import { sleep } from '@/utils';

const useResize = ({
  containerWidth,
  containerHeight,
  setScale,
  flag = 'PC',
  scale: scaleConfig,
}: {
  containerWidth: number;
  containerHeight: number;
  setScale: (value: number) => void;
  flag: ComponentData.ScreenFlagType;
  scale: ComponentData.ScreenScaleType;
}) => {
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

  const [scale /*scaleX*/, scaleY] = useMemo(() => {
    const xScale = width / containerWidth;
    const yScale = height / containerHeight;
    if (flag === 'H5') return [xScale, xScale];
    switch (scaleConfig) {
      case 'full':
        [xScale, yScale];
      case 'fit-width':
        return [xScale, xScale];
      case 'fit-height':
        return [yScale, yScale];
      case 'fit-height-scroll':
        return [yScale, yScale];
      case 'none':
      default:
        return [1, 1];
    }
  }, [width, height, containerWidth, containerHeight, flag, scaleConfig]);

  useEffect(() => {
    sleep(1000).then(resize);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    // ? 为什么会这样
    // ? 因为之前只有一个scale
    // ? 但是现在需要对预览的状态下增加不同的缩放类型，涉及了x、y两轴的缩放
    // ? 所以考虑在hooks-useWrapperProps中直接应用缩放到body上，滚动应用到html上 顺便去掉#app上的hidden
    setScale(scale * 100);
  }, [scale, setScale]);

  return [scale, scaleY];
};

export default useResize;
