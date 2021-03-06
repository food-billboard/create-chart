import { ReactNode, useCallback, useMemo } from 'react';
import { Select, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
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
      <Item label="??????">
        <FullForm>
          <Select
            value={type}
            onChange={onKeyChange.bind(null, 'type')}
            className="w-100"
          >
            <Select.Option key="plain" value="plain">
              ????????????
            </Select.Option>
            <Select.Option key="scroll" value="scroll">
              ????????????????????????
            </Select.Option>
          </Select>
        </FullForm>
      </Item>
    );
  }, [needType, type]);

  const orientConfig = useMemo(() => {
    if (!needOrient) return null;
    return (
      <Item label="????????????">
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
          header: '??????',
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
      <Item label="??????">
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
          header: '????????????',
          key: 'itemStyle',
        }}
      >
        <Item label="??????">
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
          label="????????????"
          placeholder={
            <IconTooltip title="??????????????????????????????????????????">
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
          <Item label="??????">
            <HalfForm label="???">
              <InputNumber
                value={itemStyle?.itemWidth}
                onChange={(value) => {
                  onKeyChange('itemStyle', {
                    itemWidth: value,
                  });
                }}
              />
            </HalfForm>
            <HalfForm label="???">
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
      <Item label="????????????">
        <FullForm>
          <Select
            className="w-100"
            value={align}
            options={[
              {
                label: '?????????',
                value: 'left',
              },
              {
                label: '?????????',
                value: 'right',
              },
              {
                label: '?????????',
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
          header: '??????',
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
