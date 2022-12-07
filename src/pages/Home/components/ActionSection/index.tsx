import { useEffect, useCallback } from 'react';
import { Button } from 'antd';
import TypedJs from 'typed.js';
import { history } from 'umi';
import { gotoOperation } from '@/utils/Assist/About';
import AnimationTitle from '../AnimationTitle';
import styles from './index.less';

const ActionSection = () => {
  const handleStart = useCallback(() => {
    history.push('/screen');
  }, []);

  useEffect(() => {
    return;
    const instance = new TypedJs('#home-page-action-description', {
      strings: ['帮助快速成型多样化、富交互性的数据大屏。'],
      loop: true,
      typeSpeed: 3,
    });
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <div className={styles['home-page-action']}>
      <div className={styles['home-page-action-title']}>
        <AnimationTitle />
        <span className="">设计器</span>
      </div>
      <div
        className={styles['home-page-action-description']}
        id="home-page-action-description"
      >
        帮助快速成型多样化、富交互性的数据大屏。
      </div>
      <div className={styles['home-page-action-tag']}>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__slow animate__delay-2s">
          组件丰富
        </span>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__slow animate__delay-3s">
          千人千面
        </span>
        <span className="animate__fadeInDown animate__animated animate__repeat-1 animate__slow animate__delay-4s">
          快速扩展
        </span>
      </div>
      <div className={styles['home-page-action-button']}>
        <Button onClick={handleStart} type="primary">
          开始制作
        </Button>
        <Button onClick={gotoOperation} type="primary">
          操作文档
        </Button>
      </div>
    </div>
  );
};

export default ActionSection;
