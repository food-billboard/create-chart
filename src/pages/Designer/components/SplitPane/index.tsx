import { useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactSplitPane from 'react-split-pane';
import { connect } from 'umi';
import {
  COMPONENT_TYPE_WIDTH,
  COMPONENT_SUB_TYPE_WIDTH,
  COMPONENT_LIST_MIN_WIDTH,
  MAX_LAYER_WIDTH,
  MIN_LAYER_WIDTH,
} from '@/utils/constants/another';
import LeftContent from '../LeftContent';
import Panel from '../Panel';
import RightContent from '../RightContent';
import { mapStateToProps, mapDispatchToProps } from './connect';

const SplitPane = ({
  componentCollapse,
  componentSearchCollapse,
  layerCollapse,
}: {
  componentCollapse: boolean;
  componentSearchCollapse: boolean;
  layerCollapse: boolean;
}) => {
  const [size, setSize] = useState(326);

  useUpdateEffect(() => {
    // 实际宽度
    let realSize = size;
    // 1. 组件列表和图层都展开 realSize >= 分类 + 二级分类 + 列表 + 图层min
    // 2. 组件列表展开 realSize >= 分类 + 二级列表 + 列表
    // 3. 图层展开 realSize >= 分类 + 图层min
    // 4. 都不展开 realSize >= 分类
    if (componentCollapse && layerCollapse) {
      setSize(
        Math.max(
          realSize,
          COMPONENT_TYPE_WIDTH +
            COMPONENT_SUB_TYPE_WIDTH +
            COMPONENT_LIST_MIN_WIDTH +
            MIN_LAYER_WIDTH,
        ),
      );
    } else if (componentCollapse) {
      setSize(
        Math.max(
          realSize,
          COMPONENT_TYPE_WIDTH +
            COMPONENT_SUB_TYPE_WIDTH +
            COMPONENT_LIST_MIN_WIDTH,
        ),
      );
    } else if (layerCollapse) {
      setSize(Math.max(realSize, COMPONENT_TYPE_WIDTH + MIN_LAYER_WIDTH));
    } else {
      setSize(Math.max(realSize, COMPONENT_TYPE_WIDTH));
    }
  }, [componentCollapse, componentSearchCollapse, layerCollapse]);

  return (
    // @ts-ignore
    <ReactSplitPane
      primary="second"
      defaultSize={332}
      maxSize={450}
      minSize={332}
    >
      <div className="dis-flex h-100">
        <DndProvider backend={HTML5Backend}>
          {/* @ts-ignore */}
          <ReactSplitPane size={size}>
            <LeftContent />
            <Panel />
          </ReactSplitPane>
        </DndProvider>
      </div>
      <RightContent />
    </ReactSplitPane>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SplitPane);
