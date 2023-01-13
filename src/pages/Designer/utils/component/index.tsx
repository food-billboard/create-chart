import {
  InteractionOutlined,
  AreaChartOutlined,
  FontColorsOutlined,
  FundProjectionScreenOutlined,
  CompassOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import IconFont from '@/components/ChartComponents/Common/Icon';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import BarBasic from '../../../../../public/components/bar-basic.png';
import LineBasic from '../../../../../public/components/line-basic.png';
import PieBasic from '../../../../../public/components/pie-basic.png';
import ScatterBasic from '../../../../../public/components/scatter-basic.png';
import RadarBasic from '../../../../../public/components/radar-basic.png';
import BoxPlotBasic from '../../../../../public/components/box-plot.png';
import FunnelBasic from '../../../../../public/components/funnel-basic.png';
import GaugeBasic from '../../../../../public/components/gauge-basic.png';
import TreeMapBasic from '../../../../../public/components/tree-map-basic.png';
import SunBurstBasic from '../../../../../public/components/sub-burst-basic.png';
import PictorialBarBasic from '../../../../../public/components/pictorial-bar-basic.png';
import ParallelBarBasic from '../../../../../public/components/parallel-basic.png';
import CandlestickBasic from '../../../../../public/components/candlestick-basic.png';
import TitleBasic from '../../../../../public/components/title-basic.jpg';
import TimeMachineBasic from '../../../../../public/components/time-machine.jpg';
import CountUpNumberBasic from '../../../../../public/components/count-up-number.jpg';
import ImageBasic from '../../../../../public/components/image-basic.jpg';
import VideoBasic from '../../../../../public/components/video-basic.jpg';
import CarouselBasic from '../../../../../public/components/carousel-basic.jpg';
import WordCloudBasic from '../../../../../public/components/word-cloud.png';
import IframeBasic from '../../../../../public/components/iframe.jpg';
import ListBasic from '../../../../../public/components/list-basic.jpg';
import TabBasic from '../../../../../public/components/tab-basic.jpg';
import SelectBasic from '../../../../../public/components/select-basic.jpg';
import CachetBar from '../../../../../public/components/cachet-bar.png';
import CirclePie from '../../../../../public/components/circle-pie.png';
import ClockGauge from '../../../../../public/components/clock-gauge.png';
import HorizontalBar from '../../../../../public/components/horizontal-bar.png';
import LineBar from '../../../../../public/components/line-bar.png';
import NegativeBar from '../../../../../public/components/negative-bar.png';
import NightingalePie from '../../../../../public/components/nightingale-pie.png';
import PercentBar from '../../../../../public/components/percent-bar.png';
import ProgressBar from '../../../../../public/components/progress-bar.png';
import RadialBar from '../../../../../public/components/radial-bar.png';
import RadialLine from '../../../../../public/components/radial-line.png';
import RadialStackLine from '../../../../../public/components/radial-stack-line.png';
import RankBar from '../../../../../public/components/rank-bar.png';
import StackBar from '../../../../../public/components/stack-bar.png';
import Tree from '../../../../../public/components/tree.png';
import WaterFallBar from '../../../../../public/components/waterfall-bar.png';
import ZebraBar from '../../../../../public/components/zebra-bar.png';
import TextCarousel from '../../../../../public/components/text-carousel.jpg';
import Text from '../../../../../public/components/text.jpg';
import PercentPie from '../../../../../public/components/percent-pie.png';
import WaterBall from '../../../../../public/components/water-ball.png';
import ScatterMap from '../../../../../public/components/scatter-map.png';
import BubbleScatter from '../../../../../public/components/bubble-scatter.png';
import PolarBar from '../../../../../public/components/polar-bar.png';
import StepLine from '../../../../../public/components/step-line.png';
import CarouselText from '../../../../../public/components/carousel-text.jpg';
import Icon from '../../../../../public/components/icon.jpg';
import Steps from '../../../../../public/components/steps.jpg';
import Switch from '../../../../../public/components/switch.jpg';
import Input from '../../../../../public/components/input.jpg';
import Checkbox from '../../../../../public/components/checkbox.jpg';
import Radio from '../../../../../public/components/radio.jpg';
import StateCard from '../../../../../public/components/state-card.jpg';
import PictureWall from '../../../../../public/components/picture-wall.jpg';
import DatePicker from '../../../../../public/components/date-picker.jpg';
import PolarStackBar from '../../../../../public/components/polar-stack-bar.png';
import Rate from '../../../../../public/components/rate.jpg';
import StateList from '../../../../../public/components/state-list.jpg';
import Tag from '../../../../../public/components/tag.jpg';
import Weather from '../../../../../public/components/weather.png';
import Audio from '../../../../../public/components/audio.jpg';
import Model from '../../../../../public/components/model.jpg';
import ALiMap from '../../../../../public/components/ali-map.jpg';
import QrCode from '../../../../../public/components/qrcode.jpg';
import PathBasic from '../../../../../public/components/path-basic.jpg';
import LuckyDraw from '../../../../../public/components/lucky-draw.jpg';
import Ticket from '../../../../../public/components/ticket.jpg';
import Button from '../../../../../public/components/button.jpg';
import Typed from '../../../../../public/components/typed.jpg';
import Decoration1 from '../../../../../public/components/decoration-1.jpg';
import Decoration2 from '../../../../../public/components/decoration-2.jpg';
import Decoration3 from '../../../../../public/components/decoration-3.jpg';
import Decoration4 from '../../../../../public/components/decoration-4.jpg';
import Decoration5 from '../../../../../public/components/decoration-5.jpg';
import Decoration6 from '../../../../../public/components/decoration-6.jpg';
import Decoration7 from '../../../../../public/components/decoration-7.jpg';
import Decoration8 from '../../../../../public/components/decoration-8.jpg';
import Pagination from '../../../../../public/components/pagination.jpg';
import FullScreen from '../../../../../public/components/full-screen.jpg';
import GENERATE_COMPONENT_LIST from './GenerateList';

const commonClass: string = classnames('ac-i-size-m');

const _COMPONENT_TYPE_LIST = [
  {
    type: 'Chart',
    icon: <AreaChartOutlined className={classnames(commonClass)} />,
    title: '图表',
    children: [
      {
        type: 'Bar',
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
            icon: RadialBar,
            description: '',
          },
          {
            type: 'PROGRESS_BAR',
            title: '进度条',
            icon: ProgressBar,
            description: '',
          },
          {
            type: 'RANK_BAR',
            title: '排名',
            icon: RankBar,
            description: '',
          },
          {
            type: 'HORIZONTAL_BAR',
            title: '横向柱形图',
            icon: HorizontalBar,
            description: '',
          },
          {
            type: 'CACHET_BAR',
            title: '胶囊图',
            icon: CachetBar,
            description: '',
          },
          {
            type: 'STACK_BAR',
            title: '堆叠柱形图',
            icon: StackBar,
            description: '',
          },
          {
            type: 'NEGATIVE_BAR',
            title: '正负轴柱形图',
            icon: NegativeBar,
            description: '',
          },
          {
            type: 'PERCENT_BAR',
            title: '百分比柱图',
            icon: PercentBar,
            description: '',
          },
          {
            type: 'LINE_BAR',
            title: '折线柱形图',
            icon: LineBar,
            description: '',
          },
          {
            type: 'ZEBRA_BAR',
            title: '斑马图',
            icon: ZebraBar,
            description: '',
          },
          {
            type: 'WATER_FALL_BAR',
            title: '瀑布图',
            icon: WaterFallBar,
            description: '',
          },
          {
            type: 'POLAR_BAR',
            title: '极坐标柱形图',
            icon: PolarBar,
            description: '',
          },
          {
            type: 'POLAR_STACK_BAR',
            title: '极坐标堆叠扇形柱图',
            icon: PolarStackBar,
            description: '',
          },
        ],
      },
      {
        type: 'Line',
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
            icon: RadialLine,
            description: '',
          },
          {
            type: 'RADIAL_STACK_LINE',
            title: '渐变堆叠面积图',
            icon: RadialStackLine,
            description: '',
          },
          {
            type: 'STEP_LINE',
            title: '阶梯图',
            icon: StepLine,
            description: '',
          },
        ],
      },
      {
        type: 'Pie',
        title: '饼图',
        children: [
          {
            type: 'PIE_BASIC',
            title: '基础饼图',
            icon: PieBasic,
            description: '',
          },
          {
            type: 'NIGHTINGALE_PIE',
            title: '玫瑰图',
            icon: NightingalePie,
            description: '',
          },
          {
            type: 'CIRCLE_PIE',
            title: '环形图',
            icon: CirclePie,
            description: '',
          },
          {
            type: 'PERCENT_PIE',
            title: '百分比图',
            icon: PercentPie,
            description: '',
          },
        ],
      },
      {
        type: 'Scatter',
        title: '散点图',
        children: [
          {
            type: 'SCATTER_BASIC',
            title: '基础散点图',
            icon: ScatterBasic,
            description: '',
          },
          {
            type: 'BUBBLE_SCATTER',
            title: '单轴气泡图',
            icon: BubbleScatter,
            description: '',
          },
        ],
      },
      {
        type: 'Radar',
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
        type: 'BoxPlot',
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
        type: 'Funnel',
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
        type: 'Gauge',
        title: '仪表盘',
        children: [
          {
            type: 'GAUGE_BASIC',
            title: '基础仪表盘',
            icon: GaugeBasic,
            description: '',
          },
          {
            type: 'CLOCK_GAUGE',
            title: '时钟',
            icon: ClockGauge,
            description: '',
          },
        ],
      },
      {
        type: 'TreeMap',
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
        type: 'SubBurst',
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
        type: 'PictorialBar',
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
        type: 'Parallel',
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
        type: 'Candlestick',
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
      {
        type: 'Tree',
        title: '关系图',
        children: [
          {
            type: 'TREE_BASIC',
            title: '基础关系图',
            icon: Tree,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'Font',
    title: '文本',
    icon: <FontColorsOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'Font',
        title: '文字',
        children: [
          {
            type: 'TITLE',
            title: '标题',
            icon: TitleBasic,
            description: '',
          },
          {
            type: 'TEXT',
            title: '多行文本',
            icon: Text,
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
          {
            type: 'FONT_CAROUSEL',
            title: '跑马灯',
            icon: TextCarousel,
            description: '',
          },
          {
            type: 'LOOP_TEXT',
            title: '轮播文字',
            icon: CarouselText,
            description: '',
          },
          {
            type: 'ICON',
            title: '图标',
            icon: Icon,
            description: '',
          },
          {
            type: 'TAG',
            title: '标签',
            icon: Tag,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'Media',
    title: '媒体',
    icon: <FundProjectionScreenOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'Media',
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
          {
            type: 'PICTURE_WALL',
            title: '照片墙',
            icon: PictureWall,
            description: '',
          },
          {
            type: 'AUDIO',
            title: '声音',
            icon: Audio,
            description: '',
          },
          {
            type: 'MODEL',
            title: '模型',
            icon: Model,
            description: '',
            development: GlobalConfig.IS_STATIC,
          },
        ],
      },
    ],
  },
  {
    type: 'Map',
    title: '地图',
    icon: <CompassOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'Map',
        title: '基础地图',
        children: [
          {
            type: 'SCATTER_MAP',
            title: '标记地图',
            icon: ScatterMap,
            description: '',
          },
          {
            type: 'ALI3D_MAP',
            title: '高德3d地图',
            icon: ALiMap,
            description: '',
            development: GlobalConfig.IS_STATIC,
          },
        ],
      },
    ],
  },
  {
    type: 'Other',
    title: '其他',
    icon: <AppstoreOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'Other',
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
          {
            type: 'WATER_BALL',
            title: '水球',
            icon: WaterBall,
            description: '',
          },
          {
            type: 'STATE_CARD',
            title: '状态卡片',
            icon: StateCard,
            description: '',
          },
          {
            type: 'STATE_LIST',
            title: '状态列表',
            icon: StateList,
            description: '',
          },
          {
            type: 'WEATHER',
            title: '天气',
            icon: Weather,
            description: '',
            development: GlobalConfig.IS_STATIC,
          },
          {
            type: 'PATH_BASIC',
            title: '自定义路径',
            icon: PathBasic,
            description: '',
            development: false,
          },
          {
            type: 'QR_CODE',
            title: '二维码',
            icon: QrCode,
            description: '',
            development: false,
          },
          {
            type: 'LUCKY_DRAW',
            title: '抽奖转盘',
            icon: LuckyDraw,
            description: '',
            development: false,
          },
        ],
      },
    ],
  },
  {
    type: 'Interactive',
    title: '联动',
    icon: <InteractionOutlined className={classnames(commonClass)} />,
    children: [
      {
        type: 'Interactive',
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
          {
            type: 'STEPS',
            title: '步骤条',
            icon: Steps,
            description: '',
          },
          {
            type: 'SWITCH',
            title: '开关',
            icon: Switch,
            description: '',
          },
          {
            type: 'INPUT',
            title: '输入框',
            icon: Input,
            description: '',
          },
          {
            type: 'CHECKBOX',
            title: '多选',
            icon: Checkbox,
            description: '',
          },
          {
            type: 'RADIO',
            title: '单选',
            icon: Radio,
            description: '',
          },
          {
            type: 'DATE_PICKER',
            title: '日期选择',
            icon: DatePicker,
            description: '',
          },
          {
            type: 'RATE',
            title: '评分',
            icon: Rate,
            description: '',
          },
          {
            type: 'BUTTON',
            title: '按钮',
            icon: Button,
            description: '',
          },
          {
            type: 'PAGINATION',
            title: '分页',
            icon: Pagination,
            description: '',
          },
          {
            type: 'FULL_SCREEN',
            title: '全屏切换',
            icon: FullScreen,
            description: '',
          },
        ],
      },
    ],
  },
  {
    type: 'Source',
    title: '素材',
    icon: <IconFont type="icon-sucai" className={classnames(commonClass)} />,
    children: [
      {
        type: 'Source',
        title: '素材库',
        children: [
          {
            type: 'TICKET',
            title: '卡券',
            icon: Ticket,
            description: '',
          },
          {
            type: 'TYPED',
            title: '打字机',
            icon: Typed,
            description: '',
          },
          {
            type: 'DECORATION_1',
            title: '装饰1',
            icon: Decoration1,
            description: '',
          },
          {
            type: 'DECORATION_2',
            title: '装饰2',
            icon: Decoration2,
            description: '',
          },
          {
            type: 'DECORATION_3',
            title: '装饰3',
            icon: Decoration3,
            description: '',
          },
          {
            type: 'DECORATION_4',
            title: '装饰4',
            icon: Decoration4,
            description: '',
          },
          {
            type: 'DECORATION_5',
            title: '装饰5',
            icon: Decoration5,
            description: '',
          },
          {
            type: 'DECORATION_6',
            title: '装饰6',
            icon: Decoration6,
            description: '',
          },
          {
            type: 'DECORATION_7',
            title: '装饰7',
            icon: Decoration7,
            description: '',
          },
          {
            type: 'DECORATION_8',
            title: '装饰8',
            icon: Decoration8,
            description: '',
          },
        ],
      },
    ],
  },
];

export const COMPONENT_TYPE_LIST = [
  ..._COMPONENT_TYPE_LIST.reduce<typeof _COMPONENT_TYPE_LIST>((acc, cur) => {
    const { type, children } = cur;
    let newChildren = [...children];
    const currentTypeList = GENERATE_COMPONENT_LIST.filter(
      (item) => item.parentType === type,
    );
    currentTypeList.forEach((current) => {
      const { parentType, subParentType, ...nextCurrent } = current;
      newChildren = newChildren.map((item) => {
        const { type, children } = item;
        if (type === subParentType) {
          return {
            ...item,
            children: [
              ...children,
              {
                ...nextCurrent,
              },
            ],
          };
        }
        return item;
      });
    });
    acc.push({
      ...cur,
      children: newChildren,
    });
    return acc;
  }, []),
];

export const COMPONENT_ONLY_TYPE_LIST = COMPONENT_TYPE_LIST.reduce<
  {
    type: string;
    title: string;
    description: string;
    icon: string;
  }[]
>((acc, cur) => {
  const { children } = cur;
  children.forEach((item) => {
    if (item.children) {
      item.children.forEach((item) => {
        acc.push(item);
      });
    }
  });
  return acc;
}, []);

export const COMPONENT_ICON_MAP: {
  [K in ComponentData.TComponentSelfType]: string;
} = COMPONENT_TYPE_LIST.reduce((acc, cur) => {
  cur.children.forEach((children) => {
    children.children.forEach((item) => {
      acc[item.type] = item.icon;
    });
  });
  return acc;
}, {} as any);
