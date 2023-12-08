import {
  ContactsOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { FloatButton } from 'antd';
// import { Action, Fab } from 'react-tiny-fab';
// import 'react-tiny-fab/dist/styles.css';
import { useColorThemeList } from '@/hooks';
import { gotoBlog, gotoGithub, gotoOperation } from '@/utils/Assist/About';
import styles from './index.less';

const commonStyle = {
  // color: 'white',
  // width: 30,
  // height: 30,
  // fontSize: '12px',
};

const IntroductionButton = () => {
  const [primaryColor, subColor, thirdColor, forthColor] = useColorThemeList();

  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{
        right: 24,
        // top: 56,
        // @ts-ignore
        '--float-button-color': primaryColor,
      }}
      icon={<SmileOutlined />}
      className={styles['introduction-button']}
    >
      <FloatButton
        onClick={gotoGithub}
        icon={<GithubOutlined />}
        style={{
          backgroundColor: subColor,
          ...commonStyle,
        }}
        tooltip="Github"
      />
      <FloatButton
        onClick={gotoBlog}
        icon={<ContactsOutlined />}
        style={{
          backgroundColor: thirdColor,
          ...commonStyle,
        }}
        tooltip="Blog"
      />
      <FloatButton
        onClick={gotoOperation}
        icon={<QuestionCircleOutlined />}
        style={{
          backgroundColor: forthColor,
          ...commonStyle,
        }}
        tooltip="操作文档"
      />
    </FloatButton.Group>
  );

  // return (
  //   <div className={styles['introduction-button']}>
  //     <Fab
  //       mainButtonStyles={{
  //         backgroundColor: primaryColor,
  //         color: 'white',
  //         width: 34,
  //         height: 34,
  //       }}
  //       style={{
  //         right: 0,
  //         top: 56,
  //       }}
  //       icon={<SmileOutlined />}
  //       event={'hover'}
  //       alwaysShowTitle
  //     >
  //       <Action
  //         text="Github"
  //         onClick={gotoGithub}
  //         style={{
  //           backgroundColor: subColor,
  //           ...commonStyle,
  //         }}
  //       >
  //         <GithubOutlined />
  //       </Action>
  //       <Action
  //         text="Blog"
  //         onClick={gotoBlog}
  //         style={{
  //           backgroundColor: thirdColor,
  //           ...commonStyle,
  //         }}
  //       >
  //         <ContactsOutlined />
  //       </Action>
  //       <Action
  //         text="操作文档"
  //         onClick={gotoOperation}
  //         style={{
  //           backgroundColor: forthColor,
  //           ...commonStyle,
  //         }}
  //       >
  //         <QuestionCircleOutlined />
  //       </Action>
  //     </Fab>
  //   </div>
  // );
};

export default IntroductionButton;
