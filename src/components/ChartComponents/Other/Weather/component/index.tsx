import { Space } from 'antd';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { merge, noop, uniqueId } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { usePrimaryColor } from '@/hooks';
import { getWeatherData } from '@/services';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TWeatherConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const KEY_MAP: any = {
  temperature: (value: string) => {
    return `${value}℃`;
  },
};

const Weather = (props: ComponentData.CommonComponentProps<TWeatherConfig>) => {
  const [weatherData, setWeatherData] = useState<API_THIRD.TWeatherData>();

  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { show, textStyle, widMap, align } = options;

  const primaryColor = usePrimaryColor();

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const timerRef = useRef<any>();
  const currentDate = useRef<number>();

  const {
    request,
    getValue,
    linkageMethod,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TWeatherConfig>({
    component: value,
    global,
  });

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    })?.city;
  }, [processedValue, componentFilterMap]);

  const fetchData = async () => {
    if (!finalValue) return;
    return getWeatherData({ city: finalValue })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const componentClassName = useMemo(() => {
    return classnames(
      'w-100',
      'h-100',
      className,
      styles['component-other-weather'],
    );
  }, [className]);

  const componentStyle = useMemo(() => {
    return merge(style, {
      ...textStyle,
      color: getRgbaString(textStyle.color),
      display: 'flex',
      alignItems: align.vertical,
      justifyContent: align.horizontal,
    });
  }, [style, textStyle, align]);

  const listContent = useMemo(() => {
    return (
      <div className={styles['component-other-weather-content']}>
        <Space>
          {show.map((item) => {
            const result = (weatherData?.realtime as any)?.[item];
            if (item === 'info') {
              const target = widMap.value.find(
                (item) => item.wid == weatherData?.realtime.wid,
              );
              return (
                <span key={item}>
                  {widMap.show && !!target?.icon && (
                    <span
                      className={classnames('bi', target.icon)}
                      style={{
                        ...textStyle,
                        fontSize: textStyle.fontSize + 'px',
                        color: target.color
                          ? getRgbaString(target.color)
                          : primaryColor,
                      }}
                    />
                  )}{' '}
                  {result}
                </span>
              );
            }
            return (
              <span key={item}>
                {KEY_MAP[item] ? KEY_MAP[item](result) : result}
              </span>
            );
          })}
        </Space>
      </div>
    );
  }, [show, weatherData, widMap, textStyle]);

  const onClick = () => {
    linkageMethod('click', {});
  };

  useEffect(() => {
    clearInterval(timerRef.current);

    fetchData();

    timerRef.current = setInterval(async () => {
      if (dayjs(Date.now()).isSame(currentDate.current || 0, 'day')) {
        await fetchData();
      }
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [finalValue]);

  return (
    <>
      <div
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          {listContent}
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={noop}
        componentFilter={componentFilter}
        componentCondition={{
          value: [],
          initialState: 'visible',
        }}
      />
    </>
  );
};

const WrapperWeather: typeof Weather & {
  id: ComponentData.TComponentSelfType;
} = Weather as any;

WrapperWeather.id = CHART_ID;

export default WrapperWeather;
