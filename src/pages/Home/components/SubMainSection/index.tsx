import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import classnames from 'classnames';
import { TextLoop } from 'react-text-loop-next';
import { CountUp } from 'countup.js';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { random, shuffle } from 'lodash';
import MatterBoxes from '../MatterBoxes';
import AreaChart from '../../../../../public/home/area-chart.png';
import BarChart from '../../../../../public/home/bar-chart.png';
import DotChart from '../../../../../public/home/dot-chart.png';
import LineChart from '../../../../../public/home/line-chart.png';
import ListChart from '../../../../../public/home/list-chart.png';
import MapChart from '../../../../../public/home/earth-chart.png';
import PieChart from '../../../../../public/home/pie-chart.png';
import RadarChart from '../../../../../public/home/radar-chart.png';
import ThermogramChart from '../../../../../public/home/thermogram-chart.png';
import TitleChart from '../../../../../public/home/title-chart.png';
import VideoChart from '../../../../../public/home/video-chart.png';
import ImageChart from '../../../../../public/home/image-chart.png';
import ConditionNormal from '../../../../../public/home/condition-normal.png';
import Condition1 from '../../../../../public/home/condition-1.png';
import Condition2 from '../../../../../public/home/condition-2.png';
import styles from './index.less';

const ComponentRich = () => {
  return (
    <div className={styles['home-page-sub-main-tag-one']}>
      <div>0</div>
      <TextLoop>
        {[
          AreaChart,
          BarChart,
          DotChart,
          LineChart,
          ListChart,
          // MapChart,
          PieChart,
          RadarChart,
          ThermogramChart,
          TitleChart,
          VideoChart,
          ImageChart,
        ].map((item, index) => {
          return <img key={index} src={item} />;
        })}
      </TextLoop>
    </div>
  );
};

const ChangeAble = () => {
  const [conditionNumber, setConditionNumber] = useState(200);

  const instance = useRef<CountUp>();
  const timerRef = useRef<NodeJS.Timer>();
  const carouselRef = useRef<CarouselRef>(null);

  const onCondition = useCallback((number) => {
    setTimeout(() => {
      carouselRef.current?.goTo(random(0, 4, false));
    }, 2200);
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setConditionNumber(random(0, 200, false));
    }, 5000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    instance.current = undefined;
    // 数字动画
    instance.current = new CountUp(
      'home-page-sub-main-tag-two-counter',
      conditionNumber,
      {
        duration: 2,
      },
    );
    instance.current.start();
    onCondition(conditionNumber);
  }, [conditionNumber]);

  return (
    <div className={styles['home-page-sub-main-tag-two']}>
      <div
        className={styles['home-page-sub-main-tag-two-counter']}
        id="home-page-sub-main-tag-two-counter"
      >
        {/* {conditionNumber} */}
      </div>
      <div className={styles['home-page-sub-main-tag-two-main']}>
        <Carousel
          effect="fade"
          ref={carouselRef}
          className="w-100"
          dots={false}
        >
          {[
            {
              value: ConditionNormal,
              id: '1',
            },
            {
              value: Condition1,
              id: '2',
            },
            {
              value: Condition2,
              id: '3',
            },
            {
              value: MapChart,
              id: '4',
            },
          ].map((item) => {
            const { value, id } = item;
            return (
              <div key={id}>
                <img src={value} className="w-100 h-100" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

const Word = (props: {
  children: ReactNode;
  rotate: number;
  scale: number;
  translateX: number | string;
  translateY: number | string;
}) => {
  const { children, rotate, scale, translateX, translateY } = props;

  return (
    <div
      className={styles['home-page-sub-main-tag-three-item']}
      style={{
        transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

const ExtendAble = () => {
  const [wordCloud, setWordCloud] = useState([
    {
      translateX: '100%',
      translateY: '100%',
      scale: 0.8,
      rotate: 30,
    },
    {
      translateX: '20%',
      translateY: '30%',
      scale: 0.7,
      rotate: 50,
    },
    {
      translateX: '30%',
      translateY: '130%',
      scale: 0.6,
      rotate: 20,
    },
    {
      translateX: '120%',
      translateY: '25%',
      scale: 0.4,
      rotate: 10,
    },
  ]);

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setWordCloud((prev) => {
        return shuffle(prev);
      });
    }, 3000);
  }, []);

  return (
    <div className={styles['home-page-sub-main-tag-three']}>
      <div>0</div>
      <div
        className={classnames(
          styles['home-page-sub-main-tag-three-main'],
          'pos-re',
        )}
      >
        {['A', 'B', 'C', 'D'].map((item, index) => {
          return (
            <Word key={item} {...wordCloud[index]}>
              {item}
            </Word>
          );
        })}
      </div>
    </div>
  );
};

const SubMainSection = () => {
  return (
    <div className={classnames(styles['home-page-sub-main'], 'w-100')}>
      <div className={classnames(styles['home-page-sub-main-tag'], 'w-100')}>
        <div>
          <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-2s">
            组件丰富
          </span>
          <p className="pos-re">超过80种不同组件可供不同场景选择使用</p>
          <ComponentRich />
        </div>
        <div>
          <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-3s">
            千人千面
          </span>
          <p className="pos-re">多类型条件控制保证不同人不同样</p>
          <ChangeAble />
        </div>
        <div>
          <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__delay-4s">
            快速扩展
          </span>
          <p className="pos-re">保留多入口帮助二次开发扩展。</p>
          <ExtendAble />
        </div>
      </div>
      <MatterBoxes />
    </div>
  );
};

export default SubMainSection;
