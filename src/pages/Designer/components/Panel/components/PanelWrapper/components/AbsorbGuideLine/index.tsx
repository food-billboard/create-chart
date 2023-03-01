import { useEffect, useState, useMemo } from 'react';
import { merge } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import GuideLine from '@/components/GuideLine';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
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
}) => {
  const { size } = props;

  const {
    global: { components, guideLine, scale: originScale, setGuideLine },
  } = useMobxContext();

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

export default observer(AbsorbGuideLine);
