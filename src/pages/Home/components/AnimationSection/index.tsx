import { useEffect, useRef, useMemo, useState, CSSProperties } from 'react';
import classnames from 'classnames';
import { DEFAULT_THEME_COLOR_LIST } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import ColorSelect from '@/components/ColorSelect';
import MatterBoxes from '../MatterBoxes';
import AnimationSvg from '../AnimationSvg';
import {
  AnimationOne,
  AnimationTwo,
  AnimationThree,
  AnimationFour,
  AnimationFive,
  AnimationSix,
  AnimationSeven,
  AnimationMap,
  AnimationEight,
} from '../AnimationSvg/Animation';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

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

const SVG_ANIMATION_DELAY = 300;

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
  const chartLineOneList = useMemo(() => {
    return [
      [
        {
          id: 'animation-one',
          value: <AnimationOne />,
          index: 0,
        },
        {
          id: 'animation-three',
          value: <AnimationThree />,
          index: 3,
        },
      ],
      {
        id: 'animation-map',
        value: <AnimationMap />,
        index: 1,
      },
      [
        {
          id: 'animation-two',
          value: <AnimationTwo />,
          index: 2,
        },
        {
          id: 'animation-four',
          value: <AnimationFour />,
          index: 4,
        },
      ],
    ].map((item) => {
      const children = ({ index, id, value }: any) => (
        <li key={id}>
          <AnimationSvg
            delay={index * SVG_ANIMATION_DELAY}
            id={id}
            value={value}
          />
        </li>
      );
      if (Array.isArray(item)) {
        return (
          <div key={item[0].id}>
            {item.map((item) => {
              return children(item);
            })}
          </div>
        );
      }
      return children(item);
    });
  }, []);

  const chartLineThreeList = useMemo(() => {
    return [
      {
        value: <AnimationFive />,
        id: 'animation-five',
        index: 5,
      },
      {
        value: <AnimationSix />,
        id: 'animation-six',
        index: 6,
      },
      {
        value: <AnimationSeven />,
        id: 'animation-seven',
        index: 7,
      },
      {
        value: <AnimationEight />,
        id: 'animation-eight',
        index: 8,
      },
    ].map((item) => {
      const { id, value, index } = item;
      return (
        <li key={id}>
          <AnimationSvg
            delay={index * SVG_ANIMATION_DELAY}
            value={value}
            id={id}
          />
        </li>
      );
    });
  }, []);

  const colorList = useMemo(() => {
    return DEFAULT_THEME_COLOR_LIST();
  }, []);

  const iconChartList = useMemo(() => {
    return ICON_ANIMATION_LIST.map((item, index) => {
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
    });
  }, []);

  return (
    <div className={styles['home-page']} id="home-page">
      <div id="home-page-container" className={styles['home-page-container']}>
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
          className={classnames('home-page-layer', styles['home-page-border'])}
          data-depth="0.2"
        >
          <div>
            <MatterBoxes />
            <ul
              className={classnames(
                'home-page-layer',
                styles['home-page-chart'],
              )}
              data-depth="0.25"
              data-invert-x="true"
              data-invert-y="true"
            >
              <div>{chartLineOneList}</div>
              <div>{iconChartList}</div>
              <div>{chartLineThreeList}</div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
