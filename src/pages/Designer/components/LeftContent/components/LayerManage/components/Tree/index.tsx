import { useMemo, useCallback } from 'react';
import { Tree as AntTree } from 'antd';
import { connect } from 'dva';
import type { DataNode } from 'antd/es/tree';
import { EComponentType } from '@/utils/constants';
import TreeNode from './components/TreeNode';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type TreeProps = {
  components: ComponentData.TComponentData[];
  select: string[];
  setSelect: (value: string[]) => void;
};

const Tree = (props: TreeProps) => {
  const { components, select, setSelect } = props;

  const onSelect = useCallback(
    (keys: React.Key[], info: any) => {
      const value = keys.length ? [keys[0]] : [];
      setSelect(value as string[]);
    },
    [setSelect],
  );

  const onCheck = useCallback(
    (checked) => {
      setSelect(checked);
    },
    [setSelect],
  );

  const treeData: DataNode[] = useMemo(() => {
    function deepReduce(
      list: ComponentData.TComponentData[],
      checkable: boolean,
    ) {
      return list.reduce<DataNode[]>((acc, cur) => {
        const { type, id, components } = cur;

        const isLeaf = type === EComponentType.COMPONENT;

        const treeNode: DataNode = {
          title: <TreeNode value={cur} />,
          key: id,
          isLeaf,
          checkable,
          children: isLeaf ? [] : deepReduce(components, false),
        };

        acc.push(treeNode);

        return acc;
      }, []);
    }
    const result = deepReduce(components, true);

    return result;
  }, [components]);

  return (
    <AntTree
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      blockNode
      checkable
      selectable
      checkedKeys={select}
      selectedKeys={select}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
