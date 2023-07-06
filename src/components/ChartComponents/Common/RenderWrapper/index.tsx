import InViewportWrapper from './InViewportWrapper';
import ShowIdWrapper from './ShowIdWrapper';
import DeepStructureComponent from '../../../DeepStructureComponent';

const ChartComponentMap: any = {};

const RenderWrapper = (
  Component: (props: any) => JSX.Element,
  type: ComponentData.TComponentSelfType,
) => {
  if (!ChartComponentMap[type]) {
    const Wrapper = DeepStructureComponent([
      ShowIdWrapper,
      InViewportWrapper,
      Component,
    ]);
    ChartComponentMap[type] = function (props: any) {
      return <Wrapper {...props} />;
    };
  }
  return ChartComponentMap[type];
};

export default RenderWrapper;
