import { ReactNode, useCallback, useMemo } from 'react';
import { CompatColorSelect } from '@/components/ColorSelect';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import { FontConfigList } from '../FontConfig';
import FullForm from '../Structure/FullForm';
import FormatterSelect from '../FormatterSelect';

const { Item } = ConfigList;

export type TooltipConfigProps = {
  ignore?: string[];
  value: Partial<ComponentData.ComponentTooltip> & { [key: string]: any };
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const TooltipConfig = (props: TooltipConfigProps) => {
  const { ignore = [], value, onChange, children } = props;
  const { show, formatter, backgroundColor, textStyle } = value;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const needShow = useMemo(() => {
    return !ignore.includes('show');
  }, [ignore]);

  const needFormatter = useMemo(() => {
    return !ignore.includes('formatter');
  }, [ignore]);

  const needBackgroundColor = useMemo(() => {
    return !ignore.includes('backgroundColor');
  }, [ignore]);

  const needTextStyle = useMemo(() => {
    return !ignore.includes('textStyle');
  }, [ignore]);

  const formatterConfig = useMemo(() => {
    if (!needFormatter) return null;
    return (
      <FormatterSelect
        value={formatter}
        onChange={onKeyChange.bind(null, 'formatter')}
      />
    );
  }, [needFormatter, formatter]);

  const backgroundColorConfig = useMemo(() => {
    if (!needBackgroundColor) return null;
    return (
      <Item label="背景颜色">
        <FullForm>
          <CompatColorSelect
            defaultValue={backgroundColor}
            onChange={onKeyChange.bind(null, 'backgroundColor')}
          />
        </FullForm>
      </Item>
    );
  }, [needBackgroundColor, backgroundColor, onKeyChange]);

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

  if (needShow) {
    return (
      <Collapse
        child={{
          header: '提示文字',
          key: 'tooltip',
          visibleRender: true,
          onChange: onKeyChange.bind(null, 'show'),
          value: show,
        }}
        parent={{
          activeKey: ['tooltip'],
        }}
      >
        {formatterConfig}
        {backgroundColorConfig}
        {textStyleConfig}
        {children}
      </Collapse>
    );
  }

  return (
    <ConfigList>
      {formatterConfig}
      {backgroundColorConfig}
      {textStyleConfig}
      {children}
    </ConfigList>
  );
};

export default TooltipConfig;
