import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import ComponentManage from './components/ComponentManage';
import LayerManage from './components/LayerManage';
import styles from './index.less';

const LeftContent = () => {
  return (
    <FocusWrapper
      className={classnames(styles['design-page-left'], 'pos-re w-100')}
    >
      <div
        className={classnames(
          'p-lr-24',
          'dis-flex',
          'w-100',
          'pos-re',
          styles['design-page-left-content'],
        )}
        id="design-page-left-content"
      >
        <LayerManage />
        <ComponentManage />
      </div>
    </FocusWrapper>
  );
};

export default LeftContent;
