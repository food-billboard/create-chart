import {} from 'react';
import {
  SmileOutlined,
  GithubOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Fab, Action } from 'react-tiny-fab';
import ColorSelect from '@/components/ColorSelect';
import ThemeUtil from '@/utils/Assist/Theme';
import 'react-tiny-fab/dist/styles.css';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const IntroductionButton = () => {
  const gotoGithub = () => {
    window.open('https://github.com/food-billboard', '_blank');
  };

  const gotoBlob = () => {
    window.open('https://food-billboard.github.io/', '_blank');
  };

  const gotoOperation = () => {
    window.open(
      'http://47.97.27.23/api/backend/create-chart-docs/index.html',
      '_blank',
    );
  };

  return (
    <div className={styles['introduction-button']}>
      <Fab
        mainButtonStyles={{
          backgroundColor: getRgbaString(
            ThemeUtil.generateNextColor4CurrentTheme(0),
          ),
          color: 'white',
          width: 34,
          height: 34,
        }}
        style={{
          right: 0,
          top: 56,
        }}
        icon={<SmileOutlined />}
        event={'hover'}
        alwaysShowTitle
      >
        <Action
          text="Github"
          onClick={gotoGithub}
          style={{
            backgroundColor: getRgbaString(
              ThemeUtil.generateNextColor4CurrentTheme(1),
            ),
            color: 'white',
            width: 30,
            height: 30,
            fontSize: '12px',
          }}
        >
          <GithubOutlined />
        </Action>
        <Action
          text="Blog"
          onClick={gotoBlob}
          style={{
            color: 'white',
            width: 30,
            height: 30,
            backgroundColor: getRgbaString(
              ThemeUtil.generateNextColor4CurrentTheme(2),
            ),
            fontSize: '12px',
          }}
        >
          <ContactsOutlined />
        </Action>
        <Action
          text="操作文档"
          onClick={gotoOperation}
          style={{
            color: 'white',
            width: 30,
            height: 30,
            backgroundColor: getRgbaString(
              ThemeUtil.generateNextColor4CurrentTheme(3),
            ),
            fontSize: '12px',
          }}
        >
          <QuestionCircleOutlined />
        </Action>
      </Fab>
    </div>
  );
};

export default IntroductionButton;
