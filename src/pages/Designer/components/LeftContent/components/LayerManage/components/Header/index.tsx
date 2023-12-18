import { UnorderedListOutlined } from '@ant-design/icons';
import Icon from '@/components/ChartComponents/Common/Icon';
import CommonHeader from '../../../CommonHeader';

const LayerHeader = (props: {
  onBack?: () => void;
  iconMode: boolean;
  onIconModeChange?: (iconMode: boolean) => void;
}) => {
  const { onBack, iconMode, onIconModeChange } = props;

  return (
    <CommonHeader
      title="图层管理"
      onBack={onBack}
      extra={
        iconMode ? (
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
        )
      }
    />
  );
};

export default LayerHeader;
