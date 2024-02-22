import { useControllableValue } from 'ahooks';
import { ConfigProvider, InputNumber, Slider, Space } from 'antd';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import Dropdown from '@/components/ChartComponents/Common/Dropdown';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import { wrapperId } from '../../../PanelWrapper/constants';
import { mapDispatchToProps, mapStateToProps } from './connect';
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

const Scale = (props: {
  value?: number;
  onChange?: (value: number) => void;
  pageWidth?: number;
  pageHeight?: number;
}) => {
  const [value, setValue] = useControllableValue(props, {
    defaultValue: 25,
  });

  const { pageWidth, pageHeight } = props;

  const autoFitScaleMethod = useCallback(async () => {
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
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            zIndexPopup: 1071,
          },
        },
      }}
    >
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
              selectedKeys: [],
            }}
          >
            <GlobalLoadingActonButton type="link" onClick={autoFitScaleMethod}>
              自适应
            </GlobalLoadingActonButton>
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
    </ConfigProvider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Scale);
