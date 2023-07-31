import { CaretLeftOutlined, UnorderedListOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import Icon from '@/components/ChartComponents/Common/Icon';
import styles from './index.less';

const LayerHeader = (props: {
  onBack?: () => void;
  iconMode: boolean;
  onIconModeChange?: (iconMode: boolean) => void;
}) => {
  const { onBack, iconMode, onIconModeChange } = props;

  return (
    <div
      className={classnames(
        styles['design-layer-manage-content-header'],
        'pos-sti',
        'dis-flex',
        'p-lr-4',
      )}
    >
      <CaretLeftOutlined className="m-r-8 c-po" onClick={onBack} />
      <div className="text-ellipsis c-f-s-big">图层管理</div>
      {iconMode ? (
        <Icon
          type="icon-icon_list"
          className="m-l-8 c-po"
          onClick={onIconModeChange?.bind(null, false)}
        />
      ) : (
        <UnorderedListOutlined
          className="m-l-8 c-po"
          onClick={onIconModeChange?.bind(null, true)}
        />
      )}
    </div>
  );
};

export default LayerHeader;
