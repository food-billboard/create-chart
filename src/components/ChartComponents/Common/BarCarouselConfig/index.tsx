import { ReactNode, useCallback, useMemo } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import { SingleCollapse as Collapse } from '../Collapse';
import InputNumber from '../InputNumber';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

export type BarCarouselConfigProps = {
  value: Partial<ComponentData.BarCarouselConfig> & { [key: string]: any };
  tooltip?: boolean;
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const BarCarouselConfig = (props: BarCarouselConfigProps) => {
  const { value, onChange, children, tooltip = true } = props;
  const { show, speed, showCount } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const speedConfig = useMemo(() => {
    return (
      <Item label="轮播速度">
        <FullForm>
          <InputNumber
            value={speed}
            onChange={onKeyChange.bind(null, 'speed')}
          />
        </FullForm>
      </Item>
    );
  }, [speed, onKeyChange]);

  const showCountConfig = useMemo(() => {
    return (
      <Item label="显示数量">
        <FullForm>
          <InputNumber
            value={showCount}
            onChange={onKeyChange.bind(null, 'showCount')}
          />
        </FullForm>
      </Item>
    );
  }, [showCount, onKeyChange]);

  return (
    <Collapse
      child={{
        header: (
          <>
            柱图轮播
            {tooltip && (
              <IconTooltip title="开启柱图轮播会阻止提示文字动画，切换速度和动画速度有关">
                <InfoCircleOutlined className="m-l-4" />
              </IconTooltip>
            )}
          </>
        ),
        key: 'bar-carousel',
        visibleRender: true,
        onChange: onKeyChange.bind(null, 'show'),
        value: show,
      }}
    >
      {speedConfig}
      {showCountConfig}
      {children}
    </Collapse>
  );
};

export default BarCarouselConfig;
