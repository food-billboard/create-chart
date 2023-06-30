import { ReactNode, useCallback, useMemo } from 'react';
import { Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import Select from '../Select';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import { FontConfigList } from '../FontConfig';
import FullForm from '../Structure/FullForm';
import OrientSelect from '../OrientSelect';
import KeyWordPosition from '../KeyWordPosition';
import InputNumber from '../InputNumber';
import HalfForm from '../Structure/HalfForm';
import SymbolSelect from '../SymbolSelect';

const { Item } = ConfigList;

export type LegendConfigProps = {
  ignore?: string[];
  value: Partial<ComponentData.ComponentLegend> & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const LegendConfig = (props: LegendConfigProps) => {
  const { ignore = [], value, onChange, children } = props;
  const {
    show,
    type,
    orient,
    itemGap,
    textStyle,
    left,
    top,
    align,
    itemStyle,
  } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const onPositionChange = useCallback(
    (value: ComponentData.KeyWordPositionType) => {
      onChange?.(value);
    },
    [onChange],
  );

  const needShow = useMemo(() => {
    return !ignore.includes('show');
  }, [ignore]);

  const needType = useMemo(() => {
    return !ignore.includes('type');
  }, [ignore]);

  const needOrient = useMemo(() => {
    return !ignore.includes('orient');
  }, [ignore]);

  const needTextStyle = useMemo(() => {
    return !ignore.includes('textStyle');
  }, [ignore]);

  const needItemGap = useMemo(() => {
    return !ignore.includes('itemGap');
  }, [ignore]);

  const needPosition = useMemo(() => {
    return !ignore.includes('position');
  }, [ignore]);

  const needAlign = useMemo(() => {
    return !ignore.includes('align');
  }, [ignore]);

  const needItemStyle = useMemo(() => {
    return !ignore.includes('itemStyle');
  }, [ignore]);

  const typeConfig = useMemo(() => {
    if (!needType) return null;
    return (
      <Item label="类型">
        <FullForm>
          <Select
            value={type}
            onChange={onKeyChange.bind(null, 'type')}
            className="w-100"
            options={[
              {
                label: '普通图例',
                value: 'plain',
              },
              {
                label: '可滚动翻页的图例',
                value: 'scroll',
              },
            ]}
          />
        </FullForm>
      </Item>
    );
  }, [needType, type]);

  const orientConfig = useMemo(() => {
    if (!needOrient) return null;
    return (
      <Item label="排列方式">
        <FullForm>
          <OrientSelect
            value={orient!}
            onChange={onKeyChange.bind(null, 'orient')}
          />
        </FullForm>
      </Item>
    );
  }, [needOrient, orient, onKeyChange]);

  const textStyleConfig = useMemo(() => {
    if (!needTextStyle) return null;
    return (
      <Collapse
        child={{
          header: '文本',
          key: 'textStyle',
        }}
      >
        <FontConfigList
          value={textStyle}
          onChange={onKeyChange.bind(null, 'textStyle')}
        />
      </Collapse>
    );
  }, [needTextStyle, textStyle, onKeyChange]);

  const itemGapConfig = useMemo(() => {
    if (!needItemGap) return null;
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            value={itemGap}
            onChange={onKeyChange.bind(null, 'itemGap')}
          />
        </FullForm>
      </Item>
    );
  }, [needItemGap, itemGap, onKeyChange]);

  const positionConfig = useMemo(() => {
    if (!needPosition) return null;
    return (
      <KeyWordPosition
        value={{
          left: left!,
          top: top!,
        }}
        onChange={onPositionChange}
      />
    );
  }, [needPosition, left, top, onPositionChange]);

  const itemStyleConfig = useMemo(() => {
    if (!needItemStyle) return null;
    return (
      <Collapse
        child={{
          header: '图形样式',
          key: 'itemStyle',
        }}
      >
        <Item label="类型">
          <FullForm>
            <SymbolSelect
              value={itemStyle?.icon || 'auto'}
              onChange={(value) => {
                onKeyChange('itemStyle', {
                  icon: value,
                });
              }}
            />
          </FullForm>
        </Item>
        <Item
          label="尺寸忽略"
          placeholder={
            <IconTooltip title="选择非默认图形时忽略尺寸设置">
              <InfoCircleOutlined />
            </IconTooltip>
          }
        >
          <Switch
            checked={!!itemStyle?.sizeIgnore}
            onChange={(value) => {
              onKeyChange('itemStyle', {
                sizeIgnore: value,
              });
            }}
          />
        </Item>
        {(!itemStyle?.sizeIgnore || itemStyle?.icon === 'none') && (
          <Item label="尺寸">
            <HalfForm label="宽">
              <InputNumber
                value={itemStyle?.itemWidth}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    itemWidth: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="高">
              <InputNumber
                value={itemStyle?.itemHeight}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    itemHeight: value,
                  });
                }}
              />
            </HalfForm>
          </Item>
        )}
      </Collapse>
    );
  }, [needItemStyle, itemStyle, onKeyChange]);

  const alignConfig = useMemo(() => {
    if (!needAlign) return null;
    return (
      <Item label="文字位置">
        <FullForm>
          <Select
            className="w-100"
            value={align}
            options={[
              {
                label: '左对齐',
                value: 'left',
              },
              {
                label: '右对齐',
                value: 'right',
              },
              {
                label: '自适应',
                value: 'auto',
              },
            ]}
            onChange={onKeyChange.bind(null, 'align')}
          />
        </FullForm>
      </Item>
    );
  }, [needAlign, align, onKeyChange]);

  if (needShow) {
    return (
      <Collapse
        child={{
          header: '图例',
          key: 'legend',
          visibleRender: true,
          onChange: onKeyChange.bind(null, 'show'),
          value: show,
        }}
        parent={{
          activeKey: ['legend'],
        }}
      >
        {typeConfig}
        {orientConfig}
        {itemGapConfig}
        {textStyleConfig}
        {positionConfig}
        {alignConfig}
        {itemStyleConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {typeConfig}
      {orientConfig}
      {itemGapConfig}
      {textStyleConfig}
      {positionConfig}
      {alignConfig}
      {itemStyleConfig}
      {children}
    </ConfigList>
  );
};

export default LegendConfig;
