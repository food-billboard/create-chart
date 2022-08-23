import { uniqueId, pick, get, merge } from 'lodash';
import { PANEL_ABSOLUTE_POSITION, GUIDE_LINE_PADDING } from '@/utils/constants';

type PositionData = {
  width: number;
  height: number;
  left: number;
  top: number;
};

type ActionType = 'component' | 'guide' | 'end';

export type ComponentCallback = (
  id: string,
  data: SuperPartial<ComponentData.TComponentData>,
  components: ComponentData.TComponentData[],
) => void;

export type GuideLineCallback = (
  value: SuperPartial<ComponentData.TGuideLineConfigItem>,
  index: number,
  guideLine: ComponentData.TGuideLineConfig,
) => void;

export type AbsorbEndCallback = () => void;

type NearlyData = {
  value: number;
  type:
    | 'left'
    | 'top'
    | 'right'
    | 'bottom'
    | 'horizontal' /*水平中间*/
    | 'vertical' /*垂直中间*/;
};

const NEARLY_RANGE = 15;

class AbsorbUtilClass {
  components: ComponentData.TComponentData[] = [];
  guideLine: ComponentData.TGuideLineConfig = {
    show: true,
    value: [],
  };
  scale: number = 1;

  // 更新数据
  update({
    components,
    guideLine,
    scale,
  }: {
    components: ComponentData.TComponentData[];
    guideLine: ComponentData.TGuideLineConfig;
    scale: number;
  }) {
    this.components = components;
    this.guideLine = guideLine;
    this.scale = scale;
  }

  REGISTER_MAP: {
    [key: string]: {
      type: ActionType;
      action: Function;
    };
  } = {};

  // 触发后延迟触发
  dispatchDelayMap: {
    [key: string]: number;
  } = {};

  // 注册
  register(
    type: ActionType,
    callback: ComponentCallback | GuideLineCallback | AbsorbEndCallback,
  ) {
    const id = uniqueId('AbsorbUtilClass');
    this.REGISTER_MAP[id] = {
      type,
      action: callback,
    };
    return id;
  }

  // 取消注册
  unRegister(id: string | string[]) {
    const ids = Array.isArray(id) ? id : [id];
    ids.forEach((id) => {
      delete this.REGISTER_MAP[id];
    });
  }

  dispatchAction(type: ActionType, ...args: any[]) {
    Object.values(this.REGISTER_MAP)
      .filter((item) => item.type === type)
      .forEach((item) => {
        item.action(...args);
      });
  }

  // 位置判断
  rangeCompare(target: NearlyData[], origin: NearlyData[]) {
    if (!target.length && !origin.length) return false;
    if (!target.length && origin.length) return false;
    const targetMinRange = Math.min(...target.map((item) => item.value));
    if (targetMinRange > NEARLY_RANGE) return false;
    const originMinRange = Math.min(...origin.map((item) => item.value));
    return targetMinRange <= originMinRange;
  }

  // 生成需要修改的样式
  getNeedToChangeStyle(
    value: NearlyData[],
    comparePosition: PositionData,
    targetPosition: PositionData,
  ) {
    return value.reduce<any>((acc, cur) => {
      const { type, value } = cur;
      if (type === 'left') {
        acc.left = comparePosition.left - targetPosition.width;
      } else if (type === 'top') {
        acc.top = comparePosition.top;
      } else if (type === 'bottom') {
        acc.top =
          comparePosition.top + comparePosition.height - targetPosition.height;
      } else if (type === 'right') {
        acc.left =
          comparePosition.left + comparePosition.width - targetPosition.width;
      } else if (type === 'horizontal') {
        acc.left =
          comparePosition.left +
          comparePosition.width / 2 -
          targetPosition.width / 2;
      } else if (type === 'vertical') {
        acc.top =
          comparePosition.top +
          comparePosition.height / 2 -
          targetPosition.height / 2;
      }

      return acc;
    }, {});
  }

  // 距离
  getEachRange(
    target: { left: number; top: number; width: number; height: number },
    origin: { left: number; top: number; width: number; height: number },
    ignore: NearlyData['type'][] = [],
  ) {
    return [
      {
        type: 'left',
        value: Math.abs(target.left - origin.left),
      },
      {
        type: 'right',
        value: Math.abs(
          target.left + target.width - origin.left - origin.width,
        ),
      },
      {
        type: 'top',
        value: Math.abs(target.top - origin.top),
      },
      {
        type: 'bottom',
        value: Math.abs(
          target.top + target.height - origin.top - origin.height,
        ),
      },
      {
        type: 'vertical',
        value: Math.abs(
          target.top + target.height / 2 - origin.top - origin.height / 2,
        ),
      },
      {
        type: 'horizontal',
        value: Math.abs(
          target.left + target.width / 2 - origin.left - origin.width / 2,
        ),
      },
    ].filter((item) => {
      return (
        item.value <= NEARLY_RANGE &&
        !ignore.includes(item.type as NearlyData['type'])
      );
    }) as NearlyData[];
  }

  // 组件信息
  getComponentInfo(component: ComponentData.TComponentData) {
    return pick(get(component, 'config.style'), [
      'left',
      'top',
      'width',
      'height',
    ]);
  }

  // 辅助线信息
  getGuideLineInfo(
    value: ComponentData.TGuideLineConfigItem,
    outerSclae?: number,
  ) {
    const scale = outerSclae ?? this.scale;
    const { left, top, ...nextPosition } = merge(
      {},
      {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      },
      pick(value.style, ['left', 'top', 'width', 'height']),
    );
    return Object.entries({
      ...nextPosition,
      left:
        (left * scale -
          PANEL_ABSOLUTE_POSITION.left +
          30 +
          GUIDE_LINE_PADDING +
          1 -
          1) /
        scale,
      top:
        (top * scale -
          PANEL_ABSOLUTE_POSITION.top +
          30 +
          GUIDE_LINE_PADDING +
          1 -
          1) /
        scale,
    }).reduce<PositionData>((acc, cur) => {
      const [key, value] = cur;
      acc[key as keyof PositionData] = value;
      return acc;
    }, {} as any);
  }

  // 辅助线移动开始
  onGuideLineMoveStart(
    value: ComponentData.TGuideLineConfigItem,
    index: number,
  ) {
    this.dispatchDelayMap[value.id] = 0;
  }

  // 辅助线移动
  onGuideLineMove(value: ComponentData.TGuideLineConfigItem, index: number) {
    // 10-20 不可移动

    if (this.dispatchDelayMap[value.id] < 20) {
      this.dispatchDelayMap[value.id]++;
      if (this.dispatchDelayMap[value.id] > 10) {
        return;
      }
    }

    const { type } = value;

    let nearlyComponent!: ComponentData.TComponentData;
    let nearlyData: NearlyData[] = [];

    const guideLineInfo = this.getGuideLineInfo(value);

    this.components.forEach((component) => {
      const range = this.getEachRange(
        guideLineInfo,
        this.getComponentInfo(component),
        type === 'horizontal'
          ? ['left', 'right', 'vertical']
          : ['top', 'bottom', 'horizontal'],
      );
      if (this.rangeCompare(range, nearlyData)) {
        nearlyData = range;
        nearlyComponent = component;
      }
    });

    if (nearlyComponent) {
      const { left, top } = this.getNeedToChangeStyle(
        nearlyData,
        this.getComponentInfo(nearlyComponent),
        guideLineInfo,
      );
      let changeStyle: any = {};

      if (type === 'horizontal') {
        changeStyle.top =
          ((top - guideLineInfo.height - GUIDE_LINE_PADDING) * this.scale +
            PANEL_ABSOLUTE_POSITION.top) /
          this.scale;
      } else {
        changeStyle.left =
          ((left - guideLineInfo.width - GUIDE_LINE_PADDING) * this.scale +
            PANEL_ABSOLUTE_POSITION.left) /
          this.scale;
      }

      this.dispatchAction(
        'guide',
        {
          style: changeStyle,
        },
        index,
        this.guideLine,
      );
      if (this.dispatchDelayMap[value.id] >= 20) {
        this.dispatchDelayMap[value.id] = 0;
      }
    }
  }

  // 辅助线移动结束
  onGuideLineMoveEnd() {
    this.dispatchAction('end');
  }

  // 组件与辅助线
  commonComponentMove(
    id: string,
    data: PositionData,
    changeType: 'size' | 'position',
  ) {
    let nearlyGuideLine!: ComponentData.TGuideLineConfigItem;
    let nearlyData: NearlyData[] = [];

    this.guideLine.value.forEach((guideLine) => {
      const range = this.getEachRange(
        data,
        this.getGuideLineInfo(guideLine),
        guideLine.type === 'vertical'
          ? ['bottom', 'top', 'horizontal', 'vertical']
          : ['left', 'right', 'horizontal', 'vertical'],
      );

      if (this.rangeCompare(range, nearlyData)) {
        nearlyData = range;
        nearlyGuideLine = guideLine;
      }
    });

    if (nearlyGuideLine) {
      const changeStyle = this.getNeedToChangeStyle(
        nearlyData,
        this.getGuideLineInfo(nearlyGuideLine),
        data,
      );

      let realChangeStyle: any = {};
      // 更改的样式分类
      if (changeType === 'position') {
        realChangeStyle = changeStyle;
      } else {
        if (changeStyle.left) {
          realChangeStyle.width = data.width + changeStyle.left - data.left;
        } else if (changeStyle.top) {
          realChangeStyle.height = data.height + changeStyle.top - data.top;
        }
      }

      this.dispatchAction(
        'component',
        id,
        {
          config: {
            style: realChangeStyle,
          },
        },
        this.components,
      );
      return true;
    }
    return false;
  }

  // 组件与组件
  commonComponentEachMove(
    id: string,
    data: PositionData,
    changeType: 'size' | 'position',
  ) {
    let nearlyComponent!: ComponentData.TComponentData;
    let nearlyData: NearlyData[] = [];

    this.components.forEach((component) => {
      const range = this.getEachRange(data, this.getComponentInfo(component));

      if (this.rangeCompare(range, nearlyData)) {
        nearlyData = range;
        nearlyComponent = component;
      }
    });

    if (nearlyComponent) {
      const changeStyle = this.getNeedToChangeStyle(
        nearlyData,
        this.getComponentInfo(nearlyComponent),
        data,
      );

      let realChangeStyle: any = {};
      // 更改的样式分类
      if (changeType === 'position') {
        realChangeStyle = changeStyle;
      } else {
        if (changeStyle.left) {
          realChangeStyle.width = data.width + changeStyle.left - data.left;
        } else if (changeStyle.top) {
          realChangeStyle.height = data.height + changeStyle.top - data.top;
        }
      }

      this.dispatchAction(
        'component',
        id,
        {
          config: {
            style: realChangeStyle,
          },
        },
        this.components,
      );
      return true;
    }
    return false;
  }

  // 组件调整大小
  onComponentResizing(id: string, data: PositionData) {
    let nearly = false;
    if (this.guideLine.show) {
      nearly = this.commonComponentMove(id, data, 'size');
    }
    // ! 暂时不要组件吸附了
    if (false) {
      this.commonComponentEachMove(id, data, 'size');
    }
  }

  // 组件调整大小完成
  onComponentResized() {
    if (this.guideLine.show) this.dispatchAction('end');
  }

  // 组件拖拽
  onComponentDrag(id: string, data: PositionData) {
    let nearly = false;
    if (this.guideLine.show) {
      nearly = this.commonComponentMove(id, data, 'position');
    }
    // ! 暂时不要组件吸附了
    if (false) {
      this.commonComponentEachMove(id, data, 'position');
    }
  }

  // 组件拖拽完成
  onComponentDragEnd() {
    if (this.guideLine.show) this.dispatchAction('end');
  }
}

export const AbsorbUtil = new AbsorbUtilClass();
