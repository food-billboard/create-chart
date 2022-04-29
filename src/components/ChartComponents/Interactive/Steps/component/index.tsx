import { CSSProperties, useMemo, useRef, useCallback, useState } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import RcSteps, { Step as RcStep } from 'rc-steps';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TStepsConfig } from '../type';
import 'rc-steps/assets/index.css';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'STEPS';

const Steps = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TStepsConfig>;
  global: ComponentProps['global'];
}) => {
  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const {} = options;

  const [activeSelect, setActiveSelect] = useState<number>(0);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TStepsConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const onClick = useCallback(
    (item: any) => {
      syncInteractiveAction('select', item);
      setActiveSelect(item);
    },
    [syncInteractiveAction],
  );

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-select'],
    );
  }, [className]);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        <RcSteps onChange={onClick} current={3}>
          <RcStep
            title="2222"
            subTitle="3333"
            description="44444"
            icon="normal"
            icons={{
              error: 'error',
              finish: 'finish',
            }}
            status="error"
            tailContent="shab22222i"
          />
          <RcStep
            title="2222"
            subTitle="3333"
            description="44444"
            icon="normal"
            icons={{
              error: 'error',
              finish: 'finish',
            }}
            status="finish"
            tailContent="shab22222i"
          />
          <RcStep
            title="2222"
            subTitle="3333"
            description="44444"
            icon="normal"
            icons={{
              error: 'error',
              finish: 'finish',
            }}
            status="process"
          />
          <RcStep
            title="2222"
            subTitle="3333"
            description="44444"
            icon="normal"
            icons={{
              error: 'error',
              finish: 'finish',
            }}
            status="wait"
          />
        </RcSteps>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        componentFilter={componentFilter}
      />
    </>
  );
};

const WrapperSteps: typeof Steps & {
  id: ComponentData.TComponentSelfType;
} = Steps as any;

WrapperSteps.id = CHART_ID;

export default WrapperSteps;
