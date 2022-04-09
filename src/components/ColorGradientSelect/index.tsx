import { useCallback } from 'react';
import { Slider, Row, Col } from 'antd';
import { useControllableValue } from 'ahooks';
import { merge } from 'lodash';
import classnames from 'classnames';
import ColorSelect, { CompatColorSelect } from '../ColorSelect';
import { DEFAULT_GRADIENT_COLOR } from '@/utils/constants';
import styles from './index.less';

const ColorGradientSelect = (props: {
  value?: ComponentData.TGradientColorConfig;
  onChange?: (value: ComponentData.TGradientColorConfig) => void;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TGradientColorConfig>(props, {
      defaultValue: DEFAULT_GRADIENT_COLOR,
    });

  const { start, end } = value;
  // ! 这里要改
  const direction = 0;

  const onDirectionChange = useCallback(
    (direction) => {
      let realValue = parseInt(direction) || 0;
      realValue = Math.max(Math.min(realValue, 360), 0);
      setValue(merge({}, value, { direction: realValue }));
    },
    [value],
  );

  const onColorChange = useCallback(
    (key: 'start' | 'end', color) => {
      setValue(merge({}, value, { [key]: color }));
    },
    [value],
  );

  return (
    <div className={styles['component-gradient-select']}>
      <Row gutter={24}>
        <Col span={4}>
          <div
            className={classnames(
              styles['component-gradient-select-color'],
              'border-1',
              'w-100',
              'h-100',
              'border-r-4',
            )}
            style={{
              backgroundImage: `linear-gradient(${direction}deg, ${ColorSelect.getRgbaString(
                start,
              )}, ${ColorSelect.getRgbaString(end)})`,
            }}
          ></div>
        </Col>
        <Col span={20} className="dis-flex-column-between">
          <CompatColorSelect
            value={start}
            onChange={onColorChange.bind(null, 'start')}
          />
          <CompatColorSelect
            value={end}
            onChange={onColorChange.bind(null, 'end')}
          />
        </Col>
        <Col span={24}>
          <Slider
            onAfterChange={onDirectionChange}
            defaultValue={direction}
            max={360}
            min={0}
            step={5}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ColorGradientSelect;
