import { useEffect, useRef, useState } from 'react';
import Vivus from 'vivus';
import {
  AreaChart,
  BarChart,
  LineChart,
  DotChart,
  TitleChart,
  MapChart,
  ListChart,
  ImageChart,
  VideoChart,
  PieChart,
  RadarChart,
  ThermogramChart,
} from './SvgMap';
import styles from './index.less';

const SVG_MAP = [
  {
    key: 'area-chart',
    node: AreaChart,
  },
  {
    key: 'bar-chart',
    node: BarChart,
  },
  {
    key: 'line-chart',
    node: LineChart,
  },
  {
    key: 'dot-chart',
    node: DotChart,
  },
  {
    key: 'title-chart',
    node: TitleChart,
  },
  {
    key: 'map-chart',
    node: MapChart,
  },
  {
    key: 'list-chart',
    node: ListChart,
  },
  {
    key: 'image-chart',
    node: ImageChart,
  },
  {
    key: 'video-chart',
    node: VideoChart,
  },
  {
    key: 'pie-chart',
    node: PieChart,
  },
  {
    key: 'radar-chart',
    node: RadarChart,
  },
  {
    key: 'thermogram-chart',
    node: ThermogramChart,
  },
];

const TYPE_MAP: any[] = ['delayed', 'sync', 'oneByOne'];

const PATH_TIMING_MAP: any[] = [
  Vivus.EASE,
  Vivus.EASE_IN,
  Vivus.EASE_OUT,
  Vivus.EASE_OUT_BOUNCE,
];

const ANIM_TIMING_MAP: any[] = [
  Vivus.EASE,
  Vivus.EASE_IN,
  Vivus.EASE_OUT,
  Vivus.EASE_OUT_BOUNCE,
];

const COUNTER = SVG_MAP.length;

const SvgAnimation = () => {
  const [current, setCurrent] = useState<number>(0);
  const vivusRef = useRef<Vivus>();

  useEffect(() => {
    const { key } = SVG_MAP[current];

    vivusRef.current = new Vivus(
      key,
      {
        type: TYPE_MAP[Math.floor(Math.random() * TYPE_MAP.length)],
        // pathTimingFunction: PATH_TIMING_MAP[Math.floor(Math.random() * PATH_TIMING_MAP.length)],
        // animTimingFunction: ANIM_TIMING_MAP[Math.floor(Math.random() * ANIM_TIMING_MAP.length)],
        duration: 1000,
      },
      () => {
        const next = (current + 1) % COUNTER;
        setCurrent(next);
      },
    );

    return () => {
      vivusRef.current?.destroy();
    };
  }, [current]);

  return (
    <div className={styles['svg-animation']}>
      {SVG_MAP.map((item, index) => {
        const { key, node: Node } = item as any;
        return (
          <Node
            key={key}
            style={{
              display: index === current ? 'block' : 'none',
              width: '100%',
              height: '100%',
            }}
          />
        );
      })}
    </div>
  );
};

export default SvgAnimation;
