import GuideLine from '@/components/GuideLine';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { merge } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import {
  AbsorbEndCallback,
  AbsorbUtil,
  ComponentCallback,
  GuideLineCallback,
} from './utils';

const AbsorbGuideLine = (props: {
  size: {
    width: number;
    height: number;
  };
  scale: number;
  components: ComponentData.TComponentData[];
  guideLine: ComponentData.TGuideLineConfig;
  setGuideLine: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const {
    components,
    guideLine,
    setGuideLine,
    scale: originScale,
    size,
  } = props;
  const [absorbGuideLine, setAbsorbGuideLine] = useState<
    ComponentData.TGuideLineConfigItem[]
  >([]);

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const componentCallback: ComponentCallback = (id, value, components) => {
    DataChangePool.setComponent({
      value,
      id,
      path: getPath(id),
      action: 'update',
    });
  };

  const guideLineCallback: GuideLineCallback = (value, index, guideLine) => {
    const { show, value: list } = guideLine;
    const newValue = [...list];
    const target = merge(list[index], value);
    newValue.splice(index, 1, target);
    setGuideLine({
      show,
      value: newValue,
    });
  };

  const absorbEndCallback: AbsorbEndCallback = () => {
    setAbsorbGuideLine([]);
  };

  const domList = useMemo(() => {
    return absorbGuideLine.map((line) => {
      return (
        <GuideLine size={size} scale={scale} {...line} disabled key={line.id} />
      );
    });
  }, [absorbGuideLine, scale, size]);

  useEffect(() => {
    const registerId4Component = AbsorbUtil.register(
      'component',
      componentCallback,
    );
    const registerId4GuideLine = AbsorbUtil.register(
      'guide',
      guideLineCallback,
    );
    const absorbEnd = AbsorbUtil.register('end', absorbEndCallback);
    return () => {
      AbsorbUtil.unRegister([
        registerId4Component,
        registerId4GuideLine,
        absorbEnd,
      ]);
    };
  }, []);

  useEffect(() => {
    AbsorbUtil.update({
      components,
      guideLine,
      scale,
    });
  }, [components, guideLine, scale]);

  return <>{domList}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(AbsorbGuideLine);
