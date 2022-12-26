import { SkinOutlined } from '@ant-design/icons';
import IconTooltip from '../IconTooltip';

const Typesetting = (props: { onClick?: () => void }) => {
  const { onClick } = props;

  return (
    <IconTooltip title="一键排版" iconStyle={{ margin: 0 }}>
      <SkinOutlined onClick={onClick?.bind(null, undefined)} />
    </IconTooltip>
  );
};

export default Typesetting;
