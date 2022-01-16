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
    children: [
      {
        type: 'bar',
        title: '柱形图',
        children: [
          {
            type: 'bar-basic',
            title: '基础柱形图',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
            description: '',
          },
          {
            type: 'bar-line',
            title: '折现柱形图',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
          },
        ],
      },
      {
        type: 'line',
        title: '折现图',
        children: [
          {
            type: 'line-basic',
            title: '基础折线图',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
          },
          {
            type: 'line-waterfall',
            title: '瀑布图',
            icon: 'https://t11.baidu.com/it/u=3568834696,3961759073&fm=58',
          },
        ],
      },
    ],
  },
  {
    type: 'font',
    icon: <FontColorsOutlined className={classnames(commonClass)} />,
    children: [],
  },
  {
    type: 'media',
    icon: <FundProjectionScreenOutlined className={classnames(commonClass)} />,
    children: [],
  },
  {
    type: 'map',
    icon: <CompassOutlined className={classnames(commonClass)} />,
    children: [],
  },
  {
    type: 'other',
    icon: <AppstoreOutlined className={classnames(commonClass)} />,
    children: [],
  },
  {
    type: 'interactive',
    icon: <InteractionOutlined className={classnames(commonClass)} />,
    children: [],
  },
];
