import allConfigVersionMap from '@/components/ScreenComponentConfigChangeTooltip/Constants';
import { DEFAULT_VERSION_CHANGE_TOOLTIP_ITEM } from '../../../constants/screenData';

const tooltipReduce = (tooltip: object) => {
  return Object.keys(tooltip).reduce<ComponentData.VersionChangeTooltipItem>(
    (acc, cur) => {
      acc[cur] = {
        ...DEFAULT_VERSION_CHANGE_TOOLTIP_ITEM,
      };
      return acc;
    },
    {},
  );
};

export const ScreenComponentConfigChangeTooltip = (
  screenData: ComponentData.TScreenData,
  version: string,
) => {
  // ? 只要是有一个空对象，就认定他是有值的，因为其实可以在某个版本所有可以点击的都被已读后，清除该版本的相关内容，减少请求体积
  const { extra = { versionChangeTooltip: undefined } } = screenData;
  let versionChangeTooltip: ComponentData.VersionChangeTooltip;
  // 当前存在的版本，即超过1.21
  if (extra.versionChangeTooltip) {
    versionChangeTooltip = extra.versionChangeTooltip;
    // ? 空对象的意思是，已经兼容了tooltip的版本，并且所有的tooltip都已读
    if (Object.keys(versionChangeTooltip).length) {
      // 存在数据说明前面的都有，反着来更快
      for (let index = allConfigVersionMap.length - 1; index >= 0; index--) {
        const item = allConfigVersionMap[index];
        const { version, tooltip } = item;
        if (!versionChangeTooltip[version]) {
          versionChangeTooltip[version] = tooltipReduce(tooltip);
        } else {
          break;
        }
      }
    }
  } else {
    versionChangeTooltip =
      allConfigVersionMap.reduce<ComponentData.VersionChangeTooltip>(
        (acc, cur) => {
          const { version, tooltip } = cur;
          acc[version] = tooltipReduce(tooltip);
          return acc;
        },
        {},
      );
  }
  return {
    extra: {
      ...extra,
      // * 因为此功能从1.21版本开始，所以从1.21版本开始记录
      versionChangeTooltip,
    },
  };
};
