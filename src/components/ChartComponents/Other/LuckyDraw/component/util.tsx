import { ReactNode, useMemo, CSSProperties } from 'react';
import classnames from 'classnames';
import ThemeUtil, { getRgbaString } from '@/utils/Assist/Theme';
import styles from './index.less';

const themeList = ThemeUtil.themeNameList;
const colorList0 = ThemeUtil.getThemeColorList(themeList[0]);
const colorList1 = ThemeUtil.getThemeColorList(themeList[1]);

type CommonProps = {
  size: number;
  style: CSSProperties;
  color: string;
  onClick: () => void;
  children?: ReactNode;
};

const Button1 = (props: CommonProps) => {
  const { children, onClick, size, style, color } = props;
  const buttonSize = useMemo(() => {
    return size * 0.2;
  }, [size]);
  return (
    <div
      className={classnames(
        styles['component-other-lucky-draw-button-common'],
        styles['component-other-lucky-draw-button-1'],
      )}
      style={{
        ...style,
        width: buttonSize,
        height: buttonSize,
        // @ts-ignore
        '--component-other-lucky-draw-button-color': color,
        '--component-other-lucky-draw-button-size': buttonSize * 0.2 + 'px',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Button2 = (props: CommonProps) => {
  const { children, onClick, size, style, color } = props;
  const buttonSize = useMemo(() => {
    return size * 0.2;
  }, [size]);
  return (
    <div
      className={classnames(
        styles['component-other-lucky-draw-button-common'],
        styles['component-other-lucky-draw-button-2'],
      )}
      style={{
        ...style,
        width: buttonSize,
        height: buttonSize,
        // @ts-ignore
        '--component-other-lucky-draw-button-color': color,
        '--component-other-lucky-draw-button-size': buttonSize * 0.2 + 'px',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const BUTTON_MAP = {
  custom_1: Button1,
  custom_2: Button2,
};

export const BLOCK_MAP = {
  custom_1: {
    value: [
      {
        padding: '12px',
        background: colorList0[0],
      },
      {
        padding: '6px',
        background: colorList0[1],
      },
      {
        background: colorList0[2],
      },
    ],
  },
  custom_2: {
    value: [
      {
        padding: '12px',
        background: colorList1[0],
      },
      {
        padding: '6px',
        background: colorList1[1],
      },
      {
        background: colorList0[2],
      },
    ],
  },
};

export const BACKGROUND_PADDING = 18;
