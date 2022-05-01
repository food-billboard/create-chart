import { useMemo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import ConfigList, { TConfigListItemProps } from '../Structure/ConfigList';
import SingleDefineSelect from '../SingleDefineSelect';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

const BootstrapIconSelect = (props: {
  value: string;
  onChange?: (value: string) => void;
  level?: any;
  itemProps?: TConfigListItemProps;
}) => {
  const { value, onChange, level, itemProps } = props;

  const options = useMemo(() => {
    return [
      'bi-alarm',
      'bi-arrow-through-heart',
      'bi-award',
      'bi-balloon',
      'bi-balloon-heart',
      'bi-bell',
      'bi-boombox',
    ].map((item) => ({ label: item, value: item }));
  }, []);

  return (
    <Item
      label="图标名称"
      placeholder={
        <IconTooltip
          title={
            <>
              可以参考
              <a target="_blank" href="https://icons.bootcss.com/">
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
        <SingleDefineSelect
          value={value}
          onChange={onChange}
          options={options}
        />
      </FullForm>
    </Item>
  );
};

export default BootstrapIconSelect;
