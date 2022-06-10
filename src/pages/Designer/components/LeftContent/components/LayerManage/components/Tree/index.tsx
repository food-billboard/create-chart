import { useMemo, useCallback, useState } from 'react';
import { Tree as AntTree } from 'antd';
import { connect } from 'dva';
import { pick } from 'lodash';
import type { DataNode } from 'antd/es/tree';
import arrayMove from 'array-move';
import { useUpdate } from 'ahooks';
import ColorSelect from '@/components/ColorSelect';
import { EComponentType } from '@/utils/constants';
import ThemeUtil from '@/utils/Assist/Theme';
import { useComponentPath, useIdPathMap } from '@/hooks';
import TreeNode from './components/TreeNode';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

export type TreeProps = {
  disabled?: boolean;
  iconMode: boolean;
  components: ComponentData.TComponentData[];
  select: string[];
  setSelect: (value: string[]) => void;
  setComponent: ComponentMethod.SetComponentMethod;
};

const TreeFunction = (props: TreeProps) => {
  const { components, setSelect, setComponent, select, iconMode, disabled } =
    props;

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
      setSelect(formatSelect(keys as string[]));
    },
    [setSelect, formatSelect],
  );

  const onCheck = useCallback(
    (checked: any) => {
      setSelect(checked);
    },
    [setSelect],
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
          const isSelect = select.includes(id);

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
                isSelect={isSelect}
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
    [forceUpdate, expendKeys, iconMode, select],
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

  const onDrop = useCallback(
    (info: any) => {
      const { node, dragNode, dropToGap, dropPosition, select } =
        dealDropParams(info);

      setComponent({
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
    [components, setComponent],
  );

  const selectEmpty = useCallback(() => {
    setSelect([]);
  }, [setSelect]);

  const treeData = useMemo(() => {
    return getTreeData(components);
  }, [components, expendKeys, iconMode, select]);

  return (
    <div
      className={styles['layer-manage']}
      style={{
        // @ts-ignore
        '--layer-manage-border-color': getRgbaString(
          ThemeUtil.generateNextColor4CurrentTheme(0),
        ),
      }}
    >
      <AntTree.DirectoryTree
        onSelect={onSelect}
        showIcon={false}
        onDrop={onDrop}
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
      <div
        className={styles['layer-manage-placeholder']}
        onClick={selectEmpty}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeFunction);
