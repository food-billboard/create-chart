import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react';
import { merge, uniqueId, noop } from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { getWeatherData } from '@/services';
import ThemeUtil from '@/utils/Assist/Theme';
import { TWeatherConfig } from '../type';
import styles from './index.less';
import { Space } from 'antd';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'WEATHER';

const KEY_MAP: any = {
  temperature: (value: string) => {
    return `${value}℃`;
  },
};

const Weather = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TWeatherConfig>;
  global: ComponentProps['global'];
}) => {
  const [weatherData, setWeatherData] = useState<API_THIRD.TWeatherData>();

  const { className, style, value, global } = props;

  const {
    id,
    config: { options },
  } = value;
  const { show, textStyle, widMap, align } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);
  const timerRef = useRef<any>();
  const currentDate = useRef<number>();

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
  } = useComponent<TWeatherConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

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
                        color: getRgbaString(
                          target.color ||
                            ThemeUtil.generateNextColor4CurrentTheme(0),
                        ),
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

  useEffect(() => {
    clearInterval(timerRef.current);

    fetchData();

    timerRef.current = setInterval(async () => {
      if (moment(Date.now()).isSame(currentDate.current || 0, 'day')) {
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
      >
        {listContent}
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
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
