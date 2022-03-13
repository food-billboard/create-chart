import {
  InteractionOutlined,
  AreaChartOutlined,
  FontColorsOutlined,
  FundProjectionScreenOutlined,
  CompassOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';

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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
            description: '',
          },
          {
            type: 'TIME_MACHINE',
            title: '时间器',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
            description: '',
          },
          {
            type: 'COUNT_UP_NUMBER',
            title: '数字翻牌器',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
            description: '',
          },
          {
            type: 'CAROUSEL',
            title: '轮播图',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
        type: 'word-cloud',
        title: '词云',
        children: [
          {
            type: 'WORD_CLOUD_BASIC',
            title: '词云',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
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
    children: [],
  },
];
