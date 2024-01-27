import {
  ContactsOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import type { FloatButtonProps } from 'antd';
import { gotoBlog, gotoGithub, gotoOperation } from '@/utils/Assist/About';

export const BUTTON_LIST: (FloatButtonProps & { key: string })[] = [
  {
    onClick: gotoGithub,
    tooltip: 'Github',
    icon: <GithubOutlined />,
    key: 'Github',
  },
  {
    onClick: gotoBlog,
    tooltip: 'Blog',
    icon: <ContactsOutlined />,
    key: 'Blog',
  },
  {
    onClick: gotoOperation,
    tooltip: '操作文档',
    icon: <QuestionCircleOutlined />,
    key: 'action',
  },
];
