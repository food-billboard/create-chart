import {} from 'react';
import {
  SmileOutlined,
  GithubOutlined,
  ContactsOutlined,
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
          bottom: 50,
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
      </Fab>
    </div>
  );
};

export default IntroductionButton;
