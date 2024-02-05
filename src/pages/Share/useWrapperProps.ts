import { useUnmount } from 'ahooks';
import classnames from 'classnames';
import { useEffect } from 'react';
import useResize from '../Share/useResize';
import styles from './index.less';

const useWrapperProps = ({
  containerWidth,
  containerHeight,
  setScale,
  flag = 'PC',
  scale: scaleConfig,
  bodyCalculate = true,
}: {
  containerWidth: number;
  containerHeight: number;
  setScale: (value: number) => void;
  flag: ComponentData.ScreenFlagType;
  scale: ComponentData.ScreenScaleType;
  bodyCalculate?: boolean;
}) => {
  const [scaleX, scaleY] = useResize({
    containerWidth,
    containerHeight,
    setScale,
    flag,
    scale: scaleConfig,
  });

  useEffect(() => {
    if (!bodyCalculate) return;
    // * 将缩放样式直接应用到body和html上
    const html = document.querySelector('html');
    const body = document.body;
    const app = document.querySelector('#root') as any;
    let cssText = '';
    if (html) {
      switch (scaleConfig) {
        case 'full':
        case 'fit-width':
        case 'fit-height':
        case 'none':
          html.style.overflow = 'hidden visible';
          break;
        case 'fit-height-scroll':
          html.style.overflow = 'visible hidden';
          break;
      }
    }
    switch (scaleConfig) {
      case 'full':
        cssText += `transform: scale(${scaleX}, ${scaleY});`;
        break;
      case 'fit-width':
        cssText += `transform: scale(${scaleX}) translateY(-50%);position: relative;top:50%;`;
        break;
      case 'fit-height':
        cssText += `transform: scale(${scaleX}) translateX(-50%);position: relative;left:50%;`;
        break;
      case 'none':
        break;
      case 'fit-height-scroll':
        cssText += `transform: scale(${scaleX}) translateX(-50%);position: relative;left:50%;`;
        break;
    }
    cssText += `transform-origin: left top;width: ${containerWidth}px; height: ${containerHeight}px`;
    body.style.cssText = cssText;
    if (app) app.style.overflow = 'visible';
  }, [
    flag,
    scaleX,
    scaleY,
    scaleConfig,
    containerWidth,
    containerHeight,
    bodyCalculate,
  ]);

  useUnmount(() => {
    // * 将样式还原
    const html = document.querySelector('html');
    const body = document.body;
    const app = document.querySelector('#root') as any;
    if (html) html.style.overflow = '';
    body.style.cssText =
      "transform: '';width: '';height: '';position:'';left:'';top:'';";
    if (app) app.style.overflow = '';
  });

  if (flag === 'H5')
    return {
      className: classnames(
        styles['page-preview-h5'],
        'page-preview-container',
      ),
      style: {
        transform: `scale(${scaleX}) translateX(0)`,
        minHeight: `calc( 100vh / ${scaleX} )`,
      },
      scale: scaleX,
    };

  return {
    className: classnames(styles['page-preview-pc'], 'page-preview-container'),
    style: {
      transform: 'scale(1)',
      // transform: `scale(${scaleX}) translateX(-50%)`,
      // minHeight: `calc( 100vh / ${scaleX} )`,
    },
    scale: scaleX,
  };
};

export default useWrapperProps;
