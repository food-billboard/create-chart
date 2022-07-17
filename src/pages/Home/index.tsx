import {
  useEffect,
  useRef,
  useMemo,
  useState,
  CSSProperties,
  useCallback,
} from 'react';
import classnames from 'classnames';
// @ts-ignore
import Parallax from 'parallax-js';
import { history } from 'umi';
import { DEFAULT_THEME_COLOR_LIST } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import ColorSelect from '@/components/ColorSelect';
import Background from './components/Background';
import AnimationTitle from './components/AnimationTitle';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

// svg.js svg动画
// matter.js 物理动画

const ICON_ANIMATION_LIST = [
  [
    'bi-thermometer',
    'bi-thermometer-low',
    'bi-thermometer-half',
    'bi-thermometer-high',
  ],
  ['bi-volume-mute', 'bi-volume-off', 'bi-volume-down', 'bi-volume-up'],
  ['bi-wifi-off', 'bi-wifi-1', 'bi-wifi-2', 'bi-wifi'],
  [
    'bi-reception-0',
    'bi-reception-1',
    'bi-reception-2',
    'bi-reception-3',
    'bi-reception-4',
  ],
  [
    'bi-emoji-angry',
    'bi-emoji-dizzy',
    'bi-emoji-frown',
    'bi-emoji-expressionless',
    'bi-emoji-neutral',
    'bi-emoji-smile',
    'bi-emoji-laughing',
  ],
  [
    'bi-dice-1',
    'bi-dice-2',
    'bi-dice-3',
    'bi-dice-4',
    'bi-dice-5',
    'bi-dice-6',
  ],
];

const AnimationIcon = (props: {
  value: string[];
  speed?: number;
  delay?: number;
  style?: CSSProperties;
  className?: string;
}) => {
  const { value, speed = 2000, delay = 0, style, className } = props;

  const [index, setIndex] = useState(0);

  const timerRef = useRef<any>();
  const reverRef = useRef<boolean>(false);

  const counter = useMemo(() => {
    return value.length;
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      timerRef.current = setInterval(() => {
        setIndex((prev) => {
          let newValue = prev;
          if (reverRef.current) {
            newValue--;
            if (newValue === 0) {
              reverRef.current = false;
            }
          } else {
            newValue++;
            if (newValue === counter - 1) {
              reverRef.current = true;
            }
          }
          return newValue;
        });
      }, speed);
    }, delay);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <span className={`bi ${value[index]} ${className}`} style={style}></span>
  );
};

const Home = () => {
  const parallaxRef = useRef<any>();

  const chartLineOneList = useMemo(() => {
    return (
      <ul>
        {[1, 2, 3].map((item) => {
          return (
            <li
              style={{
                backgroundColor: 'green',
                // backgroundImage: `url(${item})`
              }}
              key={item}
            ></li>
          );
        })}
      </ul>
    );
  }, []);

  const chartLineTwoList = useMemo(() => {
    return (
      <ul>
        {[1, 2].map((item) => {
          return (
            <li
              style={{
                backgroundColor: 'green',
                // backgroundImage: `url(${item})`
              }}
              key={item}
            ></li>
          );
        })}
      </ul>
    );
  }, []);

  const chartLineThreeList = useMemo(() => {
    return (
      <ul>
        {[1, 2, 3, 4].map((item) => {
          return (
            <li
              style={{
                backgroundColor: 'green',
                // backgroundImage: `url(${item})`
              }}
              key={item}
            ></li>
          );
        })}
      </ul>
    );
  }, []);

  const colorList = useMemo(() => {
    return DEFAULT_THEME_COLOR_LIST();
  }, []);

  const iconChartList = useMemo(() => {
    return (
      <ul>
        {ICON_ANIMATION_LIST.map((item, index) => {
          return (
            <li key={item[0]}>
              <AnimationIcon
                delay={parseInt((index * 100 * Math.random()) as any)}
                value={item}
                style={{
                  color: getRgbaString(colorList[index]),
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  }, []);

  const handleClick = useCallback(() => {
    history.push('/list');
  }, []);

  useEffect(() => {
    parallaxRef.current = new Parallax(
      document.querySelector('#home-page-container'),
      {
        selector: '.home-page-layer',
      },
    );
  }, []);

  return (
    <div className={styles['home-page']} onClick={handleClick}>
      <div id="home-page-container">
        <div
          className={classnames(
            'home-page-layer',
            styles['home-page-background'],
          )}
          data-depth="0.7"
          data-invert-x="true"
          data-invert-y="true"
        >
          <div>{/* <Background /> */}</div>
        </div>
        <div
          className={classnames('home-page-layer', styles['home-page-title'])}
          data-depth="0.15"
        >
          <AnimationTitle />
        </div>
        <div
          className={classnames('home-page-layer', styles['home-page-border'])}
          data-depth="0.2"
        >
          <div>
            <div></div>
          </div>
        </div>
        <div
          className={classnames('home-page-layer', styles['home-page-chart'])}
          data-depth="0.25"
          data-invert-x="true"
          data-invert-y="true"
        >
          {chartLineOneList}
        </div>
        <div
          className={classnames(
            'home-page-layer',
            styles['home-page-chart-line-two'],
          )}
          data-depth="0.3"
          data-invert-x="true"
          data-invert-y="true"
        >
          {chartLineTwoList}
        </div>
        <div
          className={classnames('home-page-layer', styles['home-page-icon'])}
          data-depth="0.35"
          data-invert-x="true"
          data-invert-y="true"
        >
          {iconChartList}
        </div>
        <div
          className={classnames(
            'home-page-layer',
            styles['home-page-chart-line-three'],
          )}
          data-depth="0.4"
        >
          {chartLineThreeList}
        </div>
      </div>
    </div>
  );
};

export default Home;
