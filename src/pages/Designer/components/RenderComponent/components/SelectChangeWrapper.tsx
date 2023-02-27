import { useUpdateEffect } from 'ahooks';
import { useIsComponentChildrenSelect, useMobxContext } from '@/hooks';

const SelectChangeWrapper = (props: {
  value: ComponentData.TComponentData;
  onSelectChange?: (isSelect: boolean) => void;
}) => {
  const { value, onSelectChange } = props;

  const {
    global: { select },
  } = useMobxContext();

  const isSelect = useIsComponentChildrenSelect(
    [value],
    select.filter(Boolean),
  );

  useUpdateEffect(() => {
    onSelectChange?.(isSelect);
  }, [isSelect]);

  return <span></span>;
};

export default SelectChangeWrapper;
