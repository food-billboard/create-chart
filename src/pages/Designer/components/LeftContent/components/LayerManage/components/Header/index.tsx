import { CaretLeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

const LayerHeader = (props: { onBack?: () => void }) => {
  const { onBack } = props;

  return (
    <div
      className={classnames(
        styles['design-layer-manage-content-header'],
        'pos-sti',
        'dis-flex',
        'p-lr-4',
        'm-b-4',
      )}
    >
      <CaretLeftOutlined className="m-r-8 c-po" onClick={onBack} />
      <div className="text-ellipsis">图层管理</div>
    </div>
  );
};

export default LayerHeader;
