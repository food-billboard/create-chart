import { useCallback, useMemo } from 'react';
import { Button, Dropdown, InputNumber, Menu, Slider, Space } from 'antd';
import { useControllableValue } from 'ahooks';
import { connect } from 'dva';
import { mapStateToProps, mapDispatchToProps } from './connect';
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
      0.1,
      (wrapperWidth * FIT_SCALE) / width,
      (wrapperHeight * FIT_SCALE) / height,
    ),
  );

  return parseInt((result * 100).toFixed(0)) || 10;
};

const Scale = (props: {
  value?: number;
  onChange?: (value: number) => void;
  pageWidth?: number;
  pageHeight?: number;
}) => {
  const [value, setValue] = useControllableValue(props, {
    defaultValue: 10,
  });

  const { pageWidth, pageHeight } = props;

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
          min={10}
          step={5}
          value={value}
          onChange={(value) => {
            setValue(value ?? 10);
          }}
        />
        <Slider
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          max={200}
          min={10}
          step={5}
        />
      </Space>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Scale);
