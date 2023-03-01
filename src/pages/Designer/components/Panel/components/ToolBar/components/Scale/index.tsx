import { useCallback, useMemo } from 'react';
import { Button, Dropdown, InputNumber, Slider, Space } from 'antd';
import { useControllableValue } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import { wrapperId } from '../../../PanelWrapper/constants';
import styles from './index.less';

export const autoFitScale = (
  width: number,
  height: number,
  flag?: ComponentData.ScreenFlagType,
) => {
  if (flag === 'H5') return 100;
  const FIT_SCALE = 0.85;

  const wrapper = document.querySelector(`#${wrapperId}`);

  if (!wrapper) return 100;

  const { width: wrapperWidth, height: wrapperHeight } =
    wrapper.getBoundingClientRect();

  const result = Math.min(
    2,
    Math.max(
      0.25,
      (wrapperWidth * FIT_SCALE) / width,
      (wrapperHeight * FIT_SCALE) / height,
    ),
  );

  return parseInt((result * 100).toFixed(0)) || 25;
};

const Scale = () => {
  const {
    global: {
      setScale,
      scale,
      screenData: {
        config: {
          style: { width: pageWidth, height: pageHeight },
        },
      },
    },
  } = useMobxContext();

  const [value, setValue] = useControllableValue(
    {
      value: scale,
      onChange: setScale,
    },
    {
      defaultValue: 25,
    },
  );

  const autoFitScaleMethod = useCallback(() => {
    const result = autoFitScale(pageWidth!, pageHeight!);
    setValue(result);
  }, []);

  const selectScaleSize = useCallback(({ key }) => {
    setValue(parseInt(key));
  }, []);

  const sizeSelect = useMemo(() => {
    const value = [50, 100, 150, 200];

    return value.map((item) => {
      return {
        label: `${item}%`,
        key: item,
      };
    });
  }, [selectScaleSize]);

  return (
    <div className={styles['design-page-toolbar-scale']}>
      <Space
        style={{
          minWidth: 300,
        }}
      >
        <Dropdown
          menu={{
            items: sizeSelect,
            selectable: true,
            onSelect: selectScaleSize,
          }}
        >
          <Button type="link" onClick={autoFitScaleMethod}>
            自适应
          </Button>
        </Dropdown>
        <InputNumber
          max={200}
          min={25}
          step={5}
          value={value}
          onChange={(value) => {
            setValue(value ?? 25);
          }}
        />
        <Slider
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          max={200}
          min={25}
          step={5}
        />
      </Space>
    </div>
  );
};

export default observer(Scale);
