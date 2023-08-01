import { InfoCircleOutlined } from '@ant-design/icons';
import { useCallback, useMemo } from 'react';
import AngleSelect from '@/components/ChartComponents/Common/AngleSelect';
import CenterPositionConfig from '@/components/ChartComponents/Common/CenterPositionConfig';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import LocalUpload, {
  MAX_FILE_SIZE,
} from '@/components/ChartComponents/Common/LocalUpload';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import SymbolSelect from '@/components/ChartComponents/Common/SymbolSelect';
import { CompatColorSelect } from '@/components/ColorSelect';
import IconTooltip from '@/components/IconTooltip';
import { TPictorialBarBasicConfig } from '../type';

const { Item } = ConfigList;

const SeriesConfig = (props: {
  value: TPictorialBarBasicConfig['series'];
  onChange: ComponentData.ComponentConfigProps<TPictorialBarBasicConfig>['onChange'];
}) => {
  const { value, onChange } = props;
  const {
    spirit,
    symbol,
    symbolSize,
    symbolRotate,
    symbolRepeat,
    symbolMargin,
    symbolRepeatDirection,
    symbolColor,
  } = value;

  const onKeyChange = useCallback(
    (key: keyof TPictorialBarBasicConfig['series'], value: any) => {
      onChange({
        config: {
          options: {
            series: {
              [key]: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const symbolConfig = useMemo(() => {
    return (
      <Item label="图形">
        <FullForm>
          <SymbolSelect
            value={symbol}
            onChange={onKeyChange.bind(null, 'symbol')}
          />
        </FullForm>
      </Item>
    );
  }, [symbol, onKeyChange]);

  const symbolColorConfig = useMemo(() => {
    return (
      <Item label="图形颜色">
        <FullForm>
          <CompatColorSelect
            value={symbolColor}
            onChange={onKeyChange.bind(null, 'symbolColor')}
          />
        </FullForm>
      </Item>
    );
  }, [symbolColor, onKeyChange]);

  const spiritConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '自定义图形',
          key: 'spirit',
          visibleRender: true,
          value: spirit.show,
          onChange: (value) => {
            onKeyChange('spirit', {
              show: value,
            });
          },
        }}
      >
        <Item
          label="图形"
          placeholder={
            <IconTooltip
              title={`尽量上传小一点的图片(${MAX_FILE_SIZE / 1024}KB)`}
            >
              <InfoCircleOutlined />
            </IconTooltip>
          }
        >
          <FullForm>
            <LocalUpload
              value={spirit.value}
              onChange={(value) => {
                onKeyChange('spirit', {
                  value,
                });
              }}
            />
          </FullForm>
        </Item>
      </Collapse>
    );
  }, [spirit, onKeyChange]);

  const symbolSizeConfig = useMemo(() => {
    return (
      <CenterPositionConfig
        value={{
          left: symbolSize[0],
          top: symbolSize[1],
        }}
        onChange={(value) => {
          onKeyChange('symbolSize', [value.left, value.top]);
        }}
        parentLabel="大小"
        subLabel={['宽', '高']}
      />
    );
  }, [symbolSize, onKeyChange]);

  const symbolRotateConfig = useMemo(() => {
    return (
      <AngleSelect
        value={symbolRotate}
        onChange={onKeyChange.bind(null, 'symbolRotate')}
      />
    );
  }, [symbolRotate, onKeyChange]);

  const symbolRepeatConfig = useMemo(() => {
    let value: any = symbolRepeat;
    if (typeof value === 'boolean') {
      value = value ? 'true' : 'false';
    }
    return (
      <Item label="是否重复">
        <FullForm>
          <Select
            className="w-100"
            value={value}
            onChange={(value: any) => {
              let realValue = value;
              if (value === 'true') {
                realValue = true;
              } else if (value === 'false') {
                realValue = false;
              }
              onKeyChange('symbolRepeat', realValue);
            }}
            options={[
              {
                label: '重复',
                value: 'true',
              },
              {
                label: '不重复',
                value: 'false',
              },
              {
                label: '固定重复',
                value: 'fixed',
              },
            ]}
          />
        </FullForm>
      </Item>
    );
  }, [symbolRepeat, onKeyChange]);

  const symbolRepeatDirectionConfig = useMemo(() => {
    return (
      <Item label="重复方向">
        <FullForm>
          <Select
            className="w-100"
            value={symbolRepeatDirection}
            onChange={onKeyChange.bind(null, 'symbolRepeatDirection')}
            options={[{ label: 'start' }, { label: 'end' }]}
          />
        </FullForm>
      </Item>
    );
  }, [symbolRepeatDirection, onKeyChange]);

  const repeatConfig = useMemo(() => {
    return (
      <Collapse
        child={{
          header: '重复',
          key: 'repeat',
        }}
      >
        {symbolRepeatConfig}
        {symbolRepeatDirectionConfig}
      </Collapse>
    );
  }, [symbolRepeatConfig, symbolRepeatDirectionConfig]);

  const symbolMarginConfig = useMemo(() => {
    return (
      <Item label="间距">
        <FullForm>
          <InputNumber
            className="w-100"
            value={symbolMargin}
            onChange={onKeyChange.bind(null, 'symbolMargin')}
          />
        </FullForm>
      </Item>
    );
  }, [symbolMargin, onKeyChange]);

  return (
    <ConfigList>
      {spiritConfig}
      {!spirit.show && (
        <>
          {symbolConfig}
          {symbolColorConfig}
        </>
      )}
      {symbolSizeConfig}
      {symbolRotateConfig}
      {repeatConfig}
      {symbolMarginConfig}
    </ConfigList>
  );
};

export default SeriesConfig;
