import { useCallback, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { CompatColorSelect } from '@/components/ColorSelect';
import GhostButton from '@/components/GhostButton';
import FullForm from '../Structure/FullForm';

const SimpleHueSelect = (props: {
  value: ComponentData.TColorConfig[];
  onChange?: (value: ComponentData.TColorConfig[]) => void;
  max?: number;
}) => {
  const { value, onChange, max = 15 } = props;

  const handleAdd = useCallback(() => {
    onChange?.([
      ...value,
      {
        r: 0,
        g: 0,
        b: 0,
      },
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
      onChange?.(newValue);
    },
    [value, onChange],
  );

  return (
    <>
      {value.map((color, index) => {
        return (
          <FullForm label={`系列${index + 1}`} key={index}>
            <CompatColorSelect
              value={color}
              onChange={onColorChange.bind(null, index)}
            />
          </FullForm>
        );
      })}
      {addButton}
    </>
  );
};

export default SimpleHueSelect;
