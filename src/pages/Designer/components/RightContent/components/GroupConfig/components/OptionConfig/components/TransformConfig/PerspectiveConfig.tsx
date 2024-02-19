import classnames from 'classnames';
import { useMemo, useCallback, Fragment } from 'react';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import styles from './index.less';

const { Item } = ConfigList;

const PointSelect = (props: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) => {
  const { value, onChange } = props;

  const handleClick = useCallback(
    (pos) => {
      onChange?.(pos);
    },
    [onChange],
  );

  const point = useMemo(() => {
    return (
      <div
        className={classnames(
          styles['point-select-active'],
          'pos-ab',
          styles['point-select-item'],
        )}
        style={{
          left: value[0] + '%',
          top: value[1] + '%',
        }}
      ></div>
    );
  }, [value]);

  return (
    <div className={classnames(styles['point-select'], 'pos-re')}>
      {new Array(3).fill(0).map((_, index) => {
        const y = index * 50;
        return (
          <Fragment key={index}>
            {new Array(3).fill(0).map((_, ind) => {
              const x = ind * 50;
              return (
                <div
                  key={ind}
                  onClick={handleClick.bind(null, [x, y])}
                  className={classnames(styles['point-select-item'], 'pos-ab')}
                  style={{
                    left: x + '%',
                    top: y + '%',
                  }}
                />
              );
            })}
          </Fragment>
        );
      })}
      {point}
    </div>
  );
};

type Value = Pick<
  ComponentData.TGroupComponentTransformConfig,
  'perspective' | 'perspectiveOrigin'
>;

const PerspectiveConfig = (props: {
  onChange: (
    value: Partial<ComponentData.TGroupComponentTransformConfig>,
  ) => void;
  value: Value;
}) => {
  const {
    onChange,
    value: { perspective, perspectiveOrigin },
  } = props;

  const onKeyChange = useCallback(
    (key: keyof Value, value: any) => {
      onChange({
        [key]: value,
      });
    },
    [onChange],
  );

  return (
    <>
      <Item label="透视距离">
        <FullForm>
          <InputNumber
            value={perspective}
            onChange={onKeyChange.bind(null, 'perspective')}
          />
        </FullForm>
      </Item>
      <Item label="消失点位置">
        <HalfForm className={styles['perspective-origin-point-wrapper']}>
          <PointSelect
            value={perspectiveOrigin}
            onChange={onKeyChange.bind(null, 'perspectiveOrigin')}
          />
        </HalfForm>
        <HalfForm className={styles['perspective-origin-input-wrapper']}>
          <InputNumber
            prefix="x"
            value={perspectiveOrigin[0]}
            onChange={(value) =>
              onKeyChange('perspectiveOrigin', [
                Math.max(Math.min(Number(value) || 0, 100), 0),
                perspectiveOrigin[1],
              ])
            }
          />
          <InputNumber
            prefix="y"
            value={perspectiveOrigin[1]}
            onChange={(value) =>
              onKeyChange('perspectiveOrigin', [
                perspectiveOrigin[0],
                Math.max(Math.min(Number(value) || 0, 100), 0),
              ])
            }
          />
        </HalfForm>
      </Item>
    </>
  );
};

export default PerspectiveConfig;
