import { useMemo, useCallback, useState } from 'react';
import { Tree as AntTree } from 'antd';
import { pick, get } from 'lodash';
import type { DataNode } from 'antd/es/tree';
import arrayMove from 'array-move';
import { useUpdate } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { EComponentType } from '@/utils/constants';
import {
  getComponentIds,
  getParentComponentIds,
  isGroupComponent,
} from '@/utils/Assist/Component';
import { useComponentPath, useIdPathMap, useMobxContext } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import TreeNode from './components/TreeNode';
import { ActionHeaderBar, ActionFooterBar } from './components/ActionBar';
import styles from './index.less';

export type TreeProps = {
  disabled?: boolean;
  iconMode: boolean;
};

const TreeFunction = (props: TreeProps) => {
  const { iconMode, disabled } = props;

  const {
    global: { components, setSelect, select },
  } = useMobxContext();

  const [expendKeys, setExpendKeys] = useState<string[]>([]);

  const forceUpdate = useUpdate();

  // 格式化选择的项
  // 在已选中子或父的情况不可再选择其子或父
  const formatSelect = useCallback((newSelect: string[]) => {
    const idPathMap = useIdPathMap();
    let newSelectList = newSelect
      .map((item) => idPathMap[item])
      .filter(Boolean);
    // 第一项与最后一项必定选中
    newSelectList = arrayMove(newSelectList, newSelectList.length - 1, 1);

    return newSelectList
      .reduce<{ id: string; path: string }[]>((source, path, index) => {
        const isValid = !source.some((judgeSelect) => {
          return (
            (judgeSelect.path.startsWith(path.path) ||
              path.path.startsWith(judgeSelect.path)) &&
            path !== judgeSelect &&
            // ? 下面这个判断不知道会不会有问题，再说吧👍
            judgeSelect.path.split('.')[0] === path.path.split('.')[0]
          );
        });

        if (isValid) {
          source.push(path);
        }

        return source;
      }, [])
      .map((item) => item.id);
  }, []);

  const onSelect = useCallback(
    (keys: React.Key[], info: any) => {
      const resultKeys = formatSelect(keys as string[]);
      setSelect(resultKeys);
    },
    [formatSelect, setSelect],
  );

  const onExpend = useCallback((keys) => {
    setExpendKeys(keys);
  }, []);

  const getTreeData: (
    components: ComponentData.TComponentData[],
  ) => DataNode[] = useCallback(
    (components) => {
      return useComponentPath<DataNode>(
        components,
        (entry, nextPath, disabled, deepReduce, checkable) => {
          const { path, ...nextEntry } = entry;
          const { id, type, components } = nextEntry;
          const isLeaf = type === EComponentType.COMPONENT;
          const isExpend = !isLeaf && expendKeys.includes(id);

          return {
            title: (
              <TreeNode
                value={nextEntry}
                path={path}
                update={forceUpdate}
                isLeaf={isLeaf}
                disabled={disabled}
                isExpend={isExpend}
                iconMode={iconMode}
              />
            ),
            key: id,
            isLeaf,
            checkable,
            children: isLeaf
              ? []
              : deepReduce(components, disabled, nextPath, false),
          };
        },
        true,
      );
    },
    [forceUpdate, expendKeys, iconMode],
  );

  // 可能是传去后台的参数
  const dealDropParams = (info: any) => {
    const {
      node: prevNode,
      dragNode: prevDragNode,
      dropToGap: prevDropToGap,
      dropPosition,
    } = info;
    // ? 可能会传到后台，所以先处理下只拿需要的数据
    const node = pick(prevNode, ['key', 'pos']);
    const dragNode = pick(prevDragNode, ['key']);
    return {
      node: {
        ...node,
        // 是否有子节点
        hasChildren: (prevNode.props.children || []).length > 0,
        // 是否展开
        expanded: prevNode.props.expanded,
      },
      dragNode,
      dropToGap: prevDropToGap,
      dropPosition,
      select,
    };
  };

  const canDrop = useCallback(
    (dropKey: string) => {
      try {
        const idPathMap = useIdPathMap();
        const path = idPathMap[dropKey].path;
        const component = get(components, path);

        if (!component.parent) {
          return true;
        } else {
          let realDropKey = dropKey;
          if (!isGroupComponent(component)) {
            realDropKey = component.parent;
          }
          const [parentKeys] = getParentComponentIds(realDropKey);
          return !select.some((selectItem) =>
            [...parentKeys, realDropKey].includes(selectItem),
          );
        }
      } catch (err) {
        return false;
      }
    },
    [components, select],
  );

  const onDragStart = useCallback(
    ({ event, node }) => {
      const key = node.key;
      const containsId = getComponentIds(key);
      const newSelect = [
        ...select.filter((item) => !containsId.includes(item)),
        key,
      ];
      setSelect(newSelect);
    },
    [select, setSelect],
  );

  const onDrop = useCallback(
    (info: any) => {
      const { node, dragNode, dropToGap, dropPosition } = dealDropParams(info);
      if (!canDrop(node.key)) return;
      DataChangePool.setComponent({
        action: 'drag',
        value: {},
        id: '',
        extra: {
          node,
          dragNode,
          dropToGap,
          dropPosition,
          select,
        },
      });
    },
    [components, select, canDrop],
  );

  const selectEmpty = useCallback(() => {
    setSelect([]);
  }, [setSelect]);

  const treeData = useMemo(() => {
    return getTreeData(components);
  }, [components, expendKeys, iconMode]);

  const tree = useMemo(() => {
    return (
      <AntTree.DirectoryTree
        onSelect={onSelect}
        showIcon={false}
        onDrop={onDrop}
        onDragStart={onDragStart}
        treeData={treeData}
        draggable={{
          icon: false,
        }}
        multiple
        selectedKeys={select}
        expandAction={false}
        defaultExpandedKeys={[]}
        className={styles['layer-manage-content']}
        onExpand={onExpend}
        disabled={!!disabled}
      />
    );
  }, [onSelect, onDrop, onDragStart, treeData, select, onExpend, disabled]);

  return (
    <div className={styles['layer-manage']}>
      <ActionHeaderBar />
      {tree}
      <div
        className={styles['layer-manage-placeholder']}
        onClick={selectEmpty}
      />
      <ActionFooterBar />
    </div>
  );
};

export default observer(TreeFunction);
