import classnames from 'classnames';
import type { HandleComponent } from 'react-rnd';
import { connect } from 'umi';
import { SELECTO_CLASSNAME } from '@/utils/constants';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const LONG_SIZE = 16;
const SHORT_SIZE = 4;

function useStyleInfo({ scale }: { scale: number }) {
  return {
    longSize: Math.max(Math.min(LONG_SIZE, LONG_SIZE * scale), LONG_SIZE / 2),
    shortSize: Math.max(
      Math.min(SHORT_SIZE, SHORT_SIZE * scale),
      SHORT_SIZE / 2,
    ),
  };
}

const _LeftAndRight = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-left-right-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: shortSize,
        height: longSize,
      }}
    />
  );
};
const LeftAndRight = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_LeftAndRight);

const _TopAndBottom = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-top-bottom-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: longSize,
        height: shortSize,
      }}
    />
  );
};
const TopAndBottom = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_TopAndBottom);

const _TopLeft = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-top-left-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: longSize,
        height: longSize,
        borderWidth: shortSize,
        transform: `translateX(-${shortSize / 2}px) translateY(-${
          shortSize / 2
        }px)`,
      }}
    />
  );
};
const TopLeft = connect(mapStateToProps, mapDispatchToProps)(_TopLeft);

const _TopRight = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-top-right-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: longSize,
        height: longSize,
        borderWidth: shortSize,
        transform: `translateX(calc( -100% + ${
          shortSize / 2
        }px )) translateY(-${shortSize / 2}px)`,
      }}
    />
  );
};
const TopRight = connect(mapStateToProps, mapDispatchToProps)(_TopRight);

const _BottomLeft = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-bottom-left-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: longSize,
        height: longSize,
        borderWidth: shortSize,
        transform: `translateX(-${shortSize / 2}px) translateY(calc( -100% + ${
          shortSize / 2
        }px))`,
      }}
    />
  );
};
const BottomLeft = connect(mapStateToProps, mapDispatchToProps)(_BottomLeft);

const _BottomRight = (props: any) => {
  const { longSize, shortSize } = useStyleInfo(props);

  return (
    <div
      {...props}
      className={classnames(
        props.className,
        SELECTO_CLASSNAME,
        styles['resize-bottom-right-style'],
      )}
      style={{
        ...props.style,
        borderRadius: shortSize,
        width: longSize,
        height: longSize,
        borderWidth: shortSize,
        transform: `translateX(calc( -100% + ${
          shortSize / 2
        }px)) translateY(calc( -100% + ${shortSize / 2}px))`,
      }}
    />
  );
};
const BottomRight = connect(mapStateToProps, mapDispatchToProps)(_BottomRight);

const resizeComponents: HandleComponent = {
  left: <LeftAndRight />,
  right: <LeftAndRight />,
  top: <TopAndBottom />,
  bottom: <TopAndBottom />,
  topLeft: <TopLeft />,
  topRight: <TopRight />,
  bottomLeft: <BottomLeft />,
  bottomRight: <BottomRight />,
};

export default resizeComponents;
