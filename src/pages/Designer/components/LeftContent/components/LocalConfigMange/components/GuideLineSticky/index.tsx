import { useCallback } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import IconTooltip from '@/components/IconTooltip';
import { useLocalStorage, useGlobalLoading } from '@/hooks';
import { LocalConfig } from '@/utils/Assist/LocalConfig';

const { Item } = ConfigList;

const GuideLineSticky = () => {
  const [value, setValue] = useLocalStorage<
    Partial<ComponentClipboard.StorageClipboardType>
  >(LocalConfig.STATIC_GUIDE_LINE_DRAG_INTEGER_STICKY, {
    show: true,
  });

  const { isGlobalActionLoading } = useGlobalLoading();

  const onChange = useCallback(
    (key: keyof ComponentData.GuideLineSticky, targetValue: any) => {
      isGlobalActionLoading({
        globalLoadingAction: async () => {
          return setValue({
            ...value,
            [key]: targetValue,
          });
        },
      });
    },
    [setValue, value],
  );

  return (
    <Item
      label="辅助线整数吸附"
      placeholder={
        <IconTooltip title="辅助线拖拽结束时，允许吸附其最近的整数坐标">
          <InfoCircleOutlined />
        </IconTooltip>
      }
    >
      <FullForm>
        <Switch checked={value?.show} onChange={onChange.bind(null, 'show')} />
      </FullForm>
    </Item>
  );
};

export default GuideLineSticky;
