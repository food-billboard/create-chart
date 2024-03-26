import {
  ContactsOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import type { FloatButtonProps } from 'antd';
import {
  gotoBlog,
  gotoGithub,
  gotoOperation,
  gotoIssue,
} from '@/utils/Assist/About';
import GlobalConfig from '@/utils/Assist/GlobalConfig';

export const BUTTON_LIST: () => (FloatButtonProps & {
  key: string;
  visible: boolean;
})[] = () => [
  {
    onClick: gotoGithub,
    tooltip: 'Github',
    icon: <GithubOutlined />,
    key: 'Github',
    visible: true,
  },
  {
    onClick: gotoBlog,
    tooltip: 'Blog',
    icon: <ContactsOutlined />,
    key: 'Blog',
    visible: true,
  },
  {
    onClick: gotoOperation,
    tooltip: '操作文档',
    icon: <QuestionCircleOutlined />,
    key: 'action',
    visible: true,
  },
  {
    onClick: gotoIssue,
    tooltip: '问题反馈',
    icon: <ExceptionOutlined />,
    key: 'feedback',
    visible: true,
  },
];
