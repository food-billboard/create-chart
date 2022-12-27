import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import RcSteps, { Step as RcStep } from './components/RcSteps';
import { TStepsConfig } from '../type';
import { CHART_ID } from '../id';
import { DEFAULT_ICON } from '../defaultConfig';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Steps = (props: ComponentData.CommonComponentProps<TStepsConfig>) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    defaultCurrent,
    carousel,
    labelPlacement,
    direction,
    click,
    icons,
    style: stepStyle,
    size,
  } = options;

  const [activeStep, setActiveStep] = useState<number>(defaultCurrent || 0);

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const timerRef = useRef<any>();

  const {
    request,
    syncInteractiveAction,
    linkageMethod,
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
    (item: any, index: number) => {
      syncInteractiveAction('click', item);
      linkageMethod('click-item', item);
      setActiveStep(index);
      clearInterval(timerRef.current);
      if (screenType === 'edit' && carousel.show) return;
      timerRef.current = setInterval(carouselChange, carousel.speed);
    },
    [syncInteractiveAction, screenType, carousel],
  );

  const onChange = (change: (prev: number) => number) => {
    new Promise((resolve) => {
      setActiveStep((prev) => {
        const newTarget = change(prev);
        const target = finalValue[newTarget];
        resolve(target);
        return newTarget;
      });
    }).then((data) => {
      syncInteractiveAction('carousel', data);
    });
  };

  const carouselChange = () => {
    onChange((prev) => {
      let nextIndex = prev + 1;
      if (finalValue.length === nextIndex) {
        if (!carousel.loop) {
          clearInterval(timerRef.current);
          nextIndex = prev;
        } else {
          nextIndex = 0;
        }
      }
      return nextIndex;
    });
  };

  const isInteractive = useMemo(() => {
    return click.show || carousel.show;
  }, [click, carousel]);

  const stepList = useMemo(() => {
    return finalValue.map((item: any, index: number) => {
      const { status, title, subTitle, description } = item;
      const { textStyle, lineStyle } =
        (stepStyle as any)[status] || stepStyle.wait;
      const icon: any = icons[index] || DEFAULT_ICON;
      let statusTextStyle = {
        ...textStyle,
        color: getRgbaString(textStyle.color),
      };
      let statusColor = getRgbaString(lineStyle.color);
      let statusIcon = icon[status];
      let statusKey = status;

      if (isInteractive) {
        if (activeStep > index) {
          statusKey = 'finish';
        } else if (activeStep == index) {
          statusKey = status === 'wait' ? 'finish' : status;
        } else {
          statusKey = 'wait';
        }
        statusTextStyle = {
          ...(stepStyle as any)[statusKey].textStyle,
          color: getRgbaString((stepStyle as any)[statusKey].textStyle.color),
        };
        statusColor = getRgbaString(
          (stepStyle as any)[statusKey].lineStyle.color,
        );
        statusIcon = icon[statusKey];
      }

      return (
        <RcStep
          key={index}
          size={size}
          direction={direction}
          style={{
            color: statusColor,
            cursor: isInteractive ? 'pointer' : 'default',
          }}
          title={<span style={statusTextStyle}>{title}</span>}
          subTitle={<span style={statusTextStyle}>{subTitle}</span>}
          description={<span style={statusTextStyle}>{description}</span>}
          icon={
            <i
              style={{
                fontSize: size + 'px',
                color: statusTextStyle.color,
              }}
              className={classnames(statusIcon, 'bi', {
                [styles['component-interactive-steps-step-process']]:
                  statusKey === 'process',
              })}
            ></i>
          }
          status={isInteractive ? undefined : status || 'wait'}
          onClick={click.show ? onClick.bind(null, item, index) : undefined}
        />
      );
    });
  }, [
    finalValue,
    stepStyle,
    icons,
    click,
    size,
    direction,
    isInteractive,
    activeStep,
  ]);

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-steps'],
    );
  }, [className]);

  const outerStatus = useMemo(() => {
    if (!isInteractive) return undefined;
    const status = finalValue[activeStep]?.status;
    return status === 'error' ? 'error' : 'finish';
  }, [isInteractive, finalValue, activeStep]);

  useEffect(() => {
    setActiveStep(defaultCurrent);
  }, [defaultCurrent]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = false;
    }
    if (screenType === 'edit' || !carousel.show) return;
    timerRef.current = setInterval(carouselChange, carousel.speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = false;
      }
    };
  }, [screenType, carousel]);

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
        <Wrapper border={border}>
          {children}
          <RcSteps
            current={activeStep}
            labelPlacement={labelPlacement}
            direction={direction}
            status={outerStatus}
          >
            {stepList}
          </RcSteps>
        </Wrapper>
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
