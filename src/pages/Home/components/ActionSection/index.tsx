import { useEffect, useCallback } from 'react';
import { Button } from 'antd';
import TypedJs from 'typed.js';
import classnames from 'classnames';
import { history } from 'umi';
import { gotoOperation } from '@/utils/Assist/About';
import AnimationTitle from '../AnimationTitle';
import styles from './index.less';

const ActionSection = () => {
  const handleStart = useCallback(() => {
    history.push('/screen');
  }, []);

  useEffect(() => {
    const instance = new TypedJs('#home-page-action-description', {
      strings: ['帮助快速成型多样化、富交互性的数据大屏。'],
      loop: true,
      typeSpeed: 80,
      startDelay: 80,
    });
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <div className={classnames(styles['home-page-action'], 'h-100 pos-re')}>
      <div className={styles['home-page-action-title']}>
        <AnimationTitle />
        <span className="">设计器</span>
      </div>
      <div
        className={classnames(styles['home-page-action-description'], 'w-100')}
      >
        <span id="home-page-action-description"></span>
      </div>
      <div className={classnames(styles['home-page-action-button'], 'w-100')}>
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
