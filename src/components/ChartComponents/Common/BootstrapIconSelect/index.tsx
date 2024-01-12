import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import ModalSelect from './components/ModalSelect';

const { Item } = ConfigList;

const BootstrapIconSelect = (props: {
  value: string;
  onChange?: (value: string) => void;
  level?: any;
  itemProps?: TConfigListItemProps;
}) => {
  const { value, onChange, level, itemProps } = props;

  return (
    <Item
      label="图标名称"
      placeholder={
        <IconTooltip
          title={
            <>
              可以参考
              <a
                className="underline-anime underline-anime-color-white"
                target="_blank"
                href="https://icons.bootcss.com/"
              >
                这里
              </a>
            </>
          }
        >
          <InfoCircleOutlined />
        </IconTooltip>
      }
      labelProps={{ level }}
      {...(itemProps || {})}
    >
      <FullForm>
        <ModalSelect value={value} onChange={onChange} />
      </FullForm>
    </Item>
  );
};

export default BootstrapIconSelect;
