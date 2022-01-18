import { useCallback } from 'react';
import { connect } from 'dva';
import { SortableContainer as RcSortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import SortableItem from '../ListItem';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const SortableContainer = RcSortableContainer(({ children }: any) => {
  return <div className={styles['design-page-layer-manage']}>{children}</div>;
});

const LayerList = (props: {
  components?: ComponentData.TComponentData[];
  setComponentAll?: (value: ComponentData.TComponentData[]) => void;
}) => {
  const { components = [], setComponentAll } = props;

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      const newComponents = arrayMove(components, oldIndex, newIndex);
      setComponentAll?.(newComponents);
    },
    [components],
  );

  return (
    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
      {components.map((item, index) => {
        return <SortableItem key={item.id} index={index} value={item} />;
      })}
    </SortableContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LayerList);
