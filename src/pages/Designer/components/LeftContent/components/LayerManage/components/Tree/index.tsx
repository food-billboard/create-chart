import { Component } from 'react';
import { Tree as AntTree } from 'antd';
import { connect } from 'dva';
import type { DataNode } from 'antd/es/tree';
import arrayMove from 'array-move';
import { EComponentType } from '@/utils/constants';
import { useComponentPath, useIdPathMap } from '@/hooks';
import TreeNode from './components/TreeNode';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export type TreeProps = {
  components: ComponentData.TComponentData[];
  select: string[];
  setSelect: (value: string[]) => void;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
};

class TreeClass extends Component<TreeProps> {
  state = {
    treeData: [],
  };

  // 格式化选择的项
  // 在已选中子或父的情况不可再选择其子或父
  formatSelect = (newSelect: string[]) => {
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
            path !== judgeSelect
          );
        });

        if (isValid) {
          source.push(path);
        }

        return source;
      }, [])
      .map((item) => item.id);
  };

  onSelect = (keys: React.Key[], info: any) => {
    this.props.setSelect(this.formatSelect(keys as string[]));
  };

  onCheck = (checked: any) => {
    this.props.setSelect(checked);
  };

  getTreeData: (components: ComponentData.TComponentData[]) => DataNode[] = (
    components,
  ) => {
    return useComponentPath<DataNode>(
      components,
      (entry, nextPath, disabled, deepReduce, checkable) => {
        const { path, ...nextEntry } = entry;
        const { id, type, components } = nextEntry;
        const isLeaf = type === EComponentType.COMPONENT;

        return {
          title: (
            <TreeNode
              value={nextEntry}
              path={path}
              update={() => this.forceUpdate()}
              isLeaf={isLeaf}
              disabled={disabled}
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
  };

  onDrop = (info: any) => {
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

    const data = [...this.props.components];

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
        dragObj.parent = item.id;
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
        dragObj.parent = item.id;
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
      dragObj.parent = undefined;
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.props.setComponentAll(data);
  };

  render() {
    const treeData = this.getTreeData(this.props.components);

    return (
      <AntTree.DirectoryTree
        onSelect={this.onSelect}
        showIcon={false}
        onDrop={this.onDrop}
        treeData={treeData}
        draggable={{
          icon: false,
        }}
        multiple
        selectedKeys={this.props.select}
        expandAction={false}
        defaultExpandedKeys={[]}
        className={styles['layer-manage-content']}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreeClass);
