import {} from 'react';
import classnames from 'classnames';
import ColorSelect from '@/components/ColorSelect';
import { useLocalStorage } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

export const BACKGROUND_ID = 'background-id';

const BackgroundConfig = () => {
  return <div>画布背景配色设置</div>;
};

const defaultColor = {
  r: 4,
  g: 15,
  b: 17,
};

export const BackgroundConfigRender = () => {
  const [value] = useLocalStorage(
    LocalConfig.CONFIG_KEY_BACKGROUND,
    defaultColor,
  );

  return (
    <div
      style={{
        color: getRgbaString(value || defaultColor),
      }}
      className={classnames('pos-ab', styles['designer-page-background'])}
      id={BACKGROUND_ID}
    ></div>
  );
};

export default BackgroundConfig;
