import { useEffect, useRef } from 'react';
import {
  Engine,
  Render,
  Runner,
  Composite,
  Mouse,
  Bodies,
  MouseConstraint,
  World,
  Svg,
  Common,
} from 'matter-js';
import { useDebounceFn } from 'ahooks';
import IsMobile from 'is-mobile';
import ColorSelect from '@/components/ColorSelect';
import { DEFAULT_THEME_COLOR_LIST } from '@/components/ChartComponents/Common/Constants/defaultConfig';
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
import svgWall from '../../../../../public/home/wall.svg';
import styles from './index.less';

const isMobile = IsMobile();

Common.setDecomp(require('poly-decomp'));

function select(root: any, selector: string) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
}

function loadSvg(url: string) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
    });
}

export const TEXTURE_MAP: {
  key: string;
  texture: string;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
}[] = [
  {
    key: 'area-chart',
    texture: AreaChart,
  },
  {
    key: 'bar-chart',
    texture: BarChart,
  },
  {
    key: 'dot-chart',
    texture: DotChart,
  },
  {
    key: 'line-chart',
    texture: LineChart,
  },
  {
    key: 'list-chart',
    texture: ListChart,
  },
  {
    key: 'map-chart',
    texture: MapChart,
  },
  {
    key: 'pie-chart',
    texture: PieChart,
  },
  {
    key: 'radar-chart',
    texture: RadarChart,
  },
  {
    key: 'thermogram-chart',
    texture: ThermogramChart,
  },
  {
    key: 'title-chart',
    texture: TitleChart,
  },
  {
    key: 'video-chart',
    texture: VideoChart,
  },
  {
    key: 'image-chart',
    texture: ImageChart,
  },
];

const BOX_LIMIT = 30;

const { getHexString } = ColorSelect;

const COLOR_LIST = DEFAULT_THEME_COLOR_LIST().map((item) => {
  return `#${getHexString(item)}`;
});

const MatterBoxes = () => {
  const engineRef = useRef<Engine>(Engine.create());
  const runnerRef = useRef<Runner>();
  const renderRef = useRef<Render>();
  const CompositeRef = useRef<Composite>();
  const worldRef = useRef<World>();
  const mouseConstraintRef = useRef<MouseConstraint>();
  const svgRootRef = useRef<any>();

  const generateBoxes = (width: number, height: number) => {
    if (CompositeRef.current) {
      Composite.clear(CompositeRef.current, true);
    }
    worldRef.current!.bodies = [];

    const offset = 10;
    const options = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
      },
    };
    const rest = 0.9;
    const space = width / BOX_LIMIT;
    const rate = width < 575 ? 0.5 : 1;

    CompositeRef.current = Composite.add(worldRef.current!, [
      ...new Array(BOX_LIMIT).fill(0).map((_, index) => {
        const targetIndex = Math.floor(Math.random() * TEXTURE_MAP.length);
        const { width, height, texture, scaleX, scaleY } =
          TEXTURE_MAP[targetIndex];

        const colorIndex = Math.floor(Math.random() * COLOR_LIST.length);
        const strokeStyle = COLOR_LIST[colorIndex];

        return Bodies.rectangle(
          10 + space * index,
          150,
          (width || 48) * rate,
          (height || 48) * rate,
          {
            restitution: rest,
            render: {
              strokeStyle,
              sprite: {
                texture,
                xScale: (scaleX || 1) * rate,
                yScale: (scaleY || 1) * rate,
              },
            },
          },
        );
      }),
      // walls 四周的墙
      Bodies.rectangle(width / 2, height - offset, width, offset * 2, options),
      Bodies.rectangle(width / 2, offset, width, offset * 2, options),
      Bodies.rectangle(offset, height / 2, offset * 2, height, options),
      Bodies.rectangle(width - offset, height / 2, offset * 2, height, options),
    ]);

    Composite.add(worldRef.current!, mouseConstraintRef.current!);
    // svgPathAdd(width, height)
  };

  const stop = () => {
    Composite.clear(engineRef.current.world, true);
    Engine.clear(engineRef.current);
    Render.stop(renderRef.current!);
    Runner.stop(runnerRef.current!);
    renderRef.current?.canvas.remove();
    // renderRef.current?.canvas = null
    // renderRef.current?.context = null
    // renderRef.current?.textures = {}
  };

  const initRender = (width: number, height: number) => {
    return Render.create({
      element: document.querySelector(
        '#home-page-matter-boxes-container',
      ) as any,
      engine: engineRef.current,
      options: {
        showAngleIndicator: false,
        wireframes: false,
        background: 'transparent',
        width,
        height,
      },
    });
  };

  const init = (width: number, height: number) => {
    worldRef.current = engineRef.current.world;

    renderRef.current = initRender(width, height);
    Render.run(renderRef.current);

    runnerRef.current = Runner.create();
    Runner.run(runnerRef.current, engineRef.current);

    const mouse = Mouse.create(renderRef.current.canvas);
    mouseConstraintRef.current = MouseConstraint.create(engineRef.current, {
      mouse,
      // constraint: {
      //   stiffness: 0.2,
      //   render: {
      //     visible: false
      //   }
      // }
    });

    mouseConstraintRef.current.mouse.element.removeEventListener(
      'mousewheel',
      // @ts-ignore
      mouseConstraintRef.current.mouse.mousewheel,
    );
    mouseConstraintRef.current.mouse.element.removeEventListener(
      'DOMMouseScroll',
      // @ts-ignore
      mouseConstraintRef.current.mouse.mousewheel,
    );

    generateBoxes(width, height);

    // Render.lookAt(renderRef.current!, {
    //   min: {
    //     x: 0,
    //     y: 0,
    //   },
    //   max: {
    //     x: 800,
    //     y: 600
    //   }
    // })

    renderRef.current.mouse = mouse;

    return stop;
  };

  const svgPathAdd = (width: number, height: number) => {
    var vertexSets = svgRootRef.current.map(function (path: any) {
      return Svg.pathToVertices(path, 30);
    });

    var terrain = Bodies.fromVertices(
      width / 2,
      height / 2,
      vertexSets,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 4,
        },
      },
      true,
    );
    Composite.add(worldRef.current!, terrain);
  };

  const { run: resize } = useDebounceFn(
    () => {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;

      try {
        stop();
      } catch (err) {}

      init(width, height);
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    return;
    loadSvg(svgWall).then((root) => {
      var paths = select(root, 'path');
      svgRootRef.current = paths;
    });
  }, []);

  return (
    <div
      id="home-page-matter-boxes-container"
      className={styles['home-page-matter-boxes-container']}
    ></div>
  );
};

export default MatterBoxes;
