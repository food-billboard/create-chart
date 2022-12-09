import { useRef, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import { TextLoop } from 'react-text-loop-next';
import { CountUp } from 'countup.js';
import { random, inRange } from 'lodash';
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
      <TextLoop>
        {[
          AreaChart,
          BarChart,
          DotChart,
          LineChart,
          ListChart,
          MapChart,
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

  const conditionElement = useMemo(() => {
    if (inRange(0, 100)) {
      return <img src={inRange(0, 50) ? ConditionNormal : Condition1} />;
    } else if (inRange(100, 150)) {
    } else {
    }
  }, [conditionNumber]);

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
    // 数字动画
    instance.current = new CountUp(
      document.querySelector('#home-page-sub-main-tag-two-counter') as any,
      0,
    );
    instance.current.start();
  }, [conditionNumber]);

  return (
    <div className={styles['home-page-sub-main-tag-two']}>
      <div
        className={styles['home-page-sub-main-tag-two-counter']}
        id="home-page-sub-main-tag-two-counter"
      >
        {conditionNumber}
      </div>
    </div>
  );
};

const ExtendAble = () => {
  return <div>可扩展性</div>;
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
