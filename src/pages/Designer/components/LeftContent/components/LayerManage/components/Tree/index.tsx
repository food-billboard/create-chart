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
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
};

const Tree = (props: TreeProps) => {
  const { components, select, setSelect, setComponentAll } = props;

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

  const onDrop = useCallback(
    (info: any) => {
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos.split('-');
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (
        data: ComponentData.TComponentData[],
        key: string,
        callback: (
          item: ComponentData.TComponentData,
          index: number,
          data: ComponentData.TComponentData[],
        ) => void,
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === key) {
            return callback(data[i], i, data);
          }
          if (data[i].type === EComponentType.GROUP_COMPONENT) {
            loop(data[i].components, key, callback);
          }
        }
      };

      const data = [...components];

      // Find dragObject
      let dragObj!: ComponentData.TComponentData;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.components = item.components || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.components.unshift(dragObj);
        });
      } else if (
        (info.node.props.children || []).length > 0 && // Has children
        info.node.props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
          item.components = item.components || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.components.unshift(dragObj);
          // in previous version, we use item.children.push(dragObj) to insert the
          // item to the tail of the children
        });
      } else {
        let ar!: ComponentData.TComponentData[];
        let i!: number;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }

      setComponentAll(data);
    },
    [treeData, setComponentAll],
  );

  return (
    <AntTree
      onSelect={onSelect}
      onCheck={onCheck}
      onDrop={onDrop}
      treeData={treeData}
      blockNode
      checkable
      selectable
      draggable={{
        icon: false,
      }}
      checkedKeys={select}
      selectedKeys={select}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tree);
