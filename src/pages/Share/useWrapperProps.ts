import useResize from '../Share/useResize';
import styles from './index.less';

const userWrapperProps = (
  containerWidth: number,
  containerHeight: number,
  setScale: (value: number) => void,
  flag: ComponentData.ScreenFlagType = 'PC',
) => {
  const scale = useResize(containerWidth, containerHeight, setScale, flag);

  return {
    className: styles[`page-preview-${flag.toLowerCase()}`],
    style: {
      transform: `scale(${scale}) translateX(${flag === 'PC' ? '50%' : '0'})`,
    },
    scale,
  };
};

export default userWrapperProps;
