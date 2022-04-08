import { useEffect, useState, useMemo } from 'react';
import { connect } from 'dva';
import { merge } from 'lodash';
import GuideLine from '@/components/GuideLine';
import { getPath } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';
import {
  AbsorbUtil,
  GuideLineCallback,
  ComponentCallback,
  AbsorbEndCallback,
} from './utils';

const AbsorbGuideLine = (props: {
  size: {
    width: number;
    height: number;
  };
  scale: number;
  components: ComponentData.TComponentData[];
  guideLine: ComponentData.TGuideLineConfig;
  setComponent: ComponentMethod.SetComponentMethod;
  setGuideLine: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const {
    components,
    guideLine,
    setComponent,
    setGuideLine,
    scale: originScale,
  } = props;
  const [absorbGuideLine, setAbsorbGuideLine] = useState<
    ComponentData.TGuideLineConfigItem[]
  >([]);

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const componentCallback: ComponentCallback = (id, value, components) => {
    setComponent({
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
      return <GuideLine scale={scale} {...line} disabled key={line.id} />;
    });
  }, [absorbGuideLine, scale]);

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
