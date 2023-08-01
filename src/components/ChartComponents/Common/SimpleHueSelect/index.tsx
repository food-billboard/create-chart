import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import { useCallback, useMemo } from 'react';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import ColorSelect from '@/components/ColorSelect';
import GhostButton from '@/components/GhostButton';
import ThemeUtil from '@/utils/Assist/Theme';
import ChartGradientSelect from '../ChartGradientSelect';
import { DEFAULT_RADIAL_CONFIG } from '../Constants/defaultConfig';
import FullForm from '../Structure/FullForm';
import styles from './index.less';

export const SimpleHueRadialSelect = (props: {
  value: ComponentData.TGradientColorConfig[];
  onChange?: (value: ComponentData.TGradientColorConfig[]) => void;
  max?: number;
}) => {
  const { value, onChange, max = 15 } = props;

  const handleAdd = useCallback(() => {
    const currentIndex = value.length;
    onChange?.([
      ...value,
      {
        ...DEFAULT_RADIAL_CONFIG,
        start: ThemeUtil.generateNextColor4CurrentTheme(currentIndex),
        end: {
          r: 255,
          g: 255,
          b: 255,
        },
      } as ComponentData.TGradientColorConfig,
    ]);
  }, [value, onChange]);

  const length = useMemo(() => {
    return value.length;
  }, [value]);

  const addButton = useMemo(() => {
    if (max === -1 || max > length) {
      return (
        <GhostButton icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </GhostButton>
      );
    }
    return null;
  }, [max, length, handleAdd]);

  const onColorChange = useCallback(
    (index, color) => {
      const newValue = [...value];
      newValue.splice(index, 1, color);
      onChange?.(newValue.filter(Boolean));
    },
    [value, onChange],
  );

  return (
    <>
      {value.map((color, index) => {
        return (
          <Collapse
            child={{
              key: index,
              header: `系列${index + 1}`,
              extra: (
                <Button
                  icon={<DeleteOutlined />}
                  title="删除"
                  onClick={(e) => {
                    e.stopPropagation();
                    onColorChange(index, null);
                  }}
                  type="link"
                />
              ),
            }}
            key={index}
            level={2}
          >
            <ChartGradientSelect
              value={color}
              onChange={onColorChange.bind(null, index)}
            />
          </Collapse>
        );
      })}
      {addButton}
    </>
  );
};

const SimpleHueSelect = (props: {
  value: ComponentData.TColorConfig[];
  onChange?: (value: ComponentData.TColorConfig[]) => void;
  max?: number;
}) => {
  const { value, onChange, max = 15 } = props;

  const handleAdd = useCallback(() => {
    const currentIndex = value.length;
    onChange?.([
      ...value,
      ThemeUtil.generateNextColor4CurrentTheme(currentIndex),
    ]);
  }, [value, onChange]);

  const length = useMemo(() => {
    return value.length;
  }, [value]);

  const addButton = useMemo(() => {
    if (max === -1 || max > length) {
      return (
        <GhostButton icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </GhostButton>
      );
    }
    return null;
  }, [max, length, handleAdd]);

  const onColorChange = useCallback(
    (index, color) => {
      const newValue = [...value];
      newValue.splice(index, 1, color);
      onChange?.(newValue.filter(Boolean));
    },
    [value, onChange],
  );

  return (
    <>
      {value.map((color, index) => {
        return (
          <FullForm label={`系列${index + 1}`} key={index}>
            <div
              className={classnames(
                'dis-flex',
                styles['simple-hue-select-wrapper'],
              )}
            >
              <ColorSelect
                value={color}
                onChange={onColorChange.bind(null, index)}
              />
              <Button
                icon={<DeleteOutlined />}
                title="删除"
                onClick={onColorChange.bind(null, index, null)}
                type="link"
              />
            </div>
          </FullForm>
        );
      })}
      {addButton}
    </>
  );
};

export default SimpleHueSelect;
