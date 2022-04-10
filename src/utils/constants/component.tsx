import {
  InteractionOutlined,
  AreaChartOutlined,
  FontColorsOutlined,
  FundProjectionScreenOutlined,
  CompassOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import BarBasic from '../../../public/components/bar-basic.png';
import LineBasic from '../../../public/components/line-basic.png';
import PieBasic from '../../../public/components/pie-basic.png';
import ScatterBasic from '../../../public/components/scatter-basic.png';
import RadarBasic from '../../../public/components/radar-basic.png';
import BoxPlotBasic from '../../../public/components/box-plot.png';
import FunnelBasic from '../../../public/components/funnel-basic.png';
import GaugeBasic from '../../../public/components/gauge-basic.png';
import TreeMapBasic from '../../../public/components/tree-map-basic.png';
import SunBurstBasic from '../../../public/components/sub-burst-basic.png';
import PictorialBarBasic from '../../../public/components/pictorial-bar-basic.png';
import ParallelBarBasic from '../../../public/components/parallel-basic.png';
import CandlestickBasic from '../../../public/components/candlestick-basic.png';
import TitleBasic from '../../../public/components/title-basic.jpg';
import TimeMachineBasic from '../../../public/components/time-machine.jpg';
import CountUpNumberBasic from '../../../public/components/count-up-number.jpg';
import ImageBasic from '../../../public/components/image-basic.jpg';
import VideoBasic from '../../../public/components/video-basic.jpg';
import CarouselBasic from '../../../public/components/carousel-basic.jpg';
import WordCloudBasic from '../../../public/components/word-cloud.jpg';
import IframeBasic from '../../../public/components/iframe.jpg';
import ListBasic from '../../../public/components/list-basic.png';
import TabBasic from '../../../public/components/tab-basic.jpg';
import SelectBasic from '../../../public/components/select-basic.jpg';

const commonClass: string = classnames('ac-i-size-m');

export const COMPONENT_TYPE_LIST = [
  {
    type: 'chart',
    icon: <AreaChartOutlined className={classnames(commonClass)} />,
    title: '图表',
    children: [
      {
        type: 'bar',
        title: '柱形图',
        children: [
          {
            type: 'BAR_BASIC',
            title: '基础柱形图',
            icon: BarBasic,
            description: '',
          },
          {
            type: 'RADIAL_BAR',
            title: '渐变柱形图',
            icon: BarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'line',
        title: '折现图',
        children: [
          {
            type: 'LINE_BASIC',
            title: '基础折线图',
            icon: LineBasic,
            description: '',
          },
          {
            type: 'RADIAL_LINE',
            title: '渐变折线图',
            icon: LineBasic,
            description: '',
          },
        ],
      },
      {
        type: 'pie',
        title: '饼图',
        children: [
          {
            type: 'PIE_BASIC',
            title: '基础饼图',
            icon: PieBasic,
            description: '',
          },
        ],
      },
      {
        type: 'scatter',
        title: '散点图',
        children: [
          {
            type: 'SCATTER_BASIC',
            title: '基础散点图',
            icon: ScatterBasic,
            description: '',
          },
        ],
      },
      {
        type: 'radar',
        title: '雷达图',
        children: [
          {
            type: 'RADAR_BASIC',
            title: '基础雷达图',
            icon: RadarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'box-plot',
        title: '盒须图',
        children: [
          {
            type: 'BOX_PLOT_BASIC',
            title: '基础盒须图',
            icon: BoxPlotBasic,
            description: '',
          },
        ],
      },
      {
        type: 'funnel',
        title: '漏斗图',
        children: [
          {
            type: 'FUNNEL_BASIC',
            title: '基础漏斗图',
            icon: FunnelBasic,
            description: '',
          },
        ],
      },
      {
        type: 'gauge',
        title: '仪表盘',
        children: [
          {
            type: 'GAUGE_BASIC',
            title: '基础仪表盘',
            icon: GaugeBasic,
            description: '',
          },
        ],
      },
      {
        type: 'tree-map',
        title: '矩形树图',
        children: [
          {
            type: 'TREE_MAP_BASIC',
            title: '基础矩形树图',
            icon: TreeMapBasic,
            description: '',
          },
        ],
      },
      {
        type: 'sub-burst',
        title: '旭日图',
        children: [
          {
            type: 'SUN_BURST_BASIC',
            title: '基础旭日图',
            icon: SunBurstBasic,
            description: '',
          },
        ],
      },
      {
        type: 'pictorial-bar',
        title: '象形图',
        children: [
          {
            type: 'PICTORIAL_BAR_BASIC',
            title: '象形柱图',
            icon: PictorialBarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'parallel',
        title: '平行坐标系',
        children: [
          {
            type: 'PARALLEL_BASIC',
            title: '基础平行坐标系',
            icon: ParallelBarBasic,
            description: '',
          },
        ],
      },
      {
        type: 'candlestick',
        title: 'K线图',
        children: [
          {
            type: 'CANDLESTICK_BASIC',
            title: '基础K线图',
            icon: CandlestickBasic,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'font',
    title: '文本',
    icon: <FontColorsOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'text',
        title: '文字',
        children: [
          {
            type: 'TITLE',
            title: '标题',
            icon: TitleBasic,
            description: '',
          },
          {
            type: 'TIME_MACHINE',
            title: '时间器',
            icon: TimeMachineBasic,
            description: '',
          },
          {
            type: 'COUNT_UP_NUMBER',
            title: '数字翻牌器',
            icon: CountUpNumberBasic,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'media',
    title: '媒体',
    icon: <FundProjectionScreenOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'media',
        title: '媒体',
        children: [
          {
            type: 'IMAGE',
            title: '图片',
            icon: ImageBasic,
            description: '',
          },
          {
            type: 'VIDEO',
            title: '视频',
            icon: VideoBasic,
            description: '',
          },
          {
            type: 'CAROUSEL',
            title: '轮播图',
            icon: CarouselBasic,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'map',
    title: '地图',
    icon: <CompassOutlined className={classnames(commonClass)} />,
    children: [],
  },
  {
    type: 'other',
    title: '其他',
    icon: <AppstoreOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'other',
        title: '其他',
        children: [
          {
            type: 'WORD_CLOUD_BASIC',
            title: '词云',
            icon: WordCloudBasic,
            description: '',
          },
          {
            type: 'IFRAME',
            title: 'iframe',
            icon: IframeBasic,
            description: '',
          },
          {
            type: 'LIST',
            title: '列表',
            icon: ListBasic,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'interactive',
    title: '联动',
    icon: <InteractionOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'interactive',
        title: '联动',
        children: [
          {
            type: 'TAB',
            title: 'Tab标签',
            icon: TabBasic,
            description: '',
          },
          {
            type: 'SELECT',
            title: '下拉框',
            icon: SelectBasic,
            description: '',
          },
        ],
      },
    ],
  },
];
