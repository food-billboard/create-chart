import { Collapse } from 'antd';
import { ReactNode } from 'react';
import {
  SortableContainer as SortableContainerWrapper,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

const SortableContainer = SortableContainerWrapper(
  ({ children }: { children: ReactNode }) => {
    return <div className="sort-list-wrapper">{children}</div>;
  },
) as any;

export default SortableContainer;
