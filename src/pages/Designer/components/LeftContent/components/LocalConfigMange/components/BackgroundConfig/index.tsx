import { useCallback } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import IconTooltip from '@/components/IconTooltip';
import { CompatColorSelect } from '@/components/ColorSelect';
import { useLocalStorage, useGlobalLoading } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';

const { Item } = ConfigList;

const BackgroundConfig = () => {
  const [value, setValue] = useLocalStorage(LocalConfig.CONFIG_KEY_BACKGROUND, {
    r: 4,
    g: 15,
    b: 17,
  });

  const { isGlobalActionLoading } = useGlobalLoading();

  const onChange = useCallback(
    (value) => {
      isGlobalActionLoading({
        globalLoadingAction: async () => {
          return setValue(value);
        },
      });
    },
    [setValue],
  );

  return (
    <Item
      label="背景色"
      placeholder={
        <IconTooltip title="只在设计时使用">
          <InfoCircleOutlined />
        </IconTooltip>
      }
    >
      <FullForm>
        <CompatColorSelect value={value} onChange={onChange} />
      </FullForm>
    </Item>
  );
};

export default BackgroundConfig;
