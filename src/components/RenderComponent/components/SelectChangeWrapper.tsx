import { connect } from 'dva';
import { useUpdateEffect } from 'ahooks';
import { useIsComponentChildrenSelect } from '@/hooks';
import { ConnectState } from '@/models/connect';

const SelectChangeWrapper = (props: {
  select: string[];
  value: ComponentData.TComponentData;
  onSelectChange?: (isSelect: boolean) => void;
}) => {
  const { value, select, onSelectChange } = props;

  const isSelect = useIsComponentChildrenSelect(
    [value],
    select.filter(Boolean),
  );

  useUpdateEffect(() => {
    onSelectChange?.(isSelect);
  }, [isSelect]);

  return <span></span>;
};

const ConnectSelectChangeWrapper = connect(
  (state: ConnectState) => {
    return {
      select: state.global.select,
    };
  },
  () => ({}),
)(SelectChangeWrapper);

export default ConnectSelectChangeWrapper;
