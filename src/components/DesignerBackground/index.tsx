import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

export const BACKGROUND_ID = 'background-id';

const BackgroundConfig = () => {
  return <div>画布背景配色设置</div>;
};

export const BackgroundConfigRender = () => {
  // ! 这里需要修改 后面需要改成从缓存中拿配置
  const COLOR = '#040F11';

  return (
    <div
      style={{
        color: COLOR,
      }}
      className={classnames('pos-ab', styles['designer-page-background'])}
      id={BACKGROUND_ID}
    ></div>
  );
};

export default BackgroundConfig;
