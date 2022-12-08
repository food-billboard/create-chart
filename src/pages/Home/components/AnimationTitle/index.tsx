import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useThrottleFn } from 'ahooks';
// @ts-ignore
import * as Shine from '@/lib/shine';
import styles from './index.less';

const AnimationTitle = () => {
  const shine = useRef<any>();

  const { run: handleMouseMove } = useThrottleFn(
    (event: any) => {
      shine.current.light.position.x = event.clientX;
      shine.current.light.position.y = event.clientY;
      shine.current.draw();
    },
    {
      wait: 100,
    },
  );

  useEffect(() => {
    if (!shine.current && document.getElementById('typed-title'))
      shine.current = new Shine.Shine(
        document.getElementById('typed-title'),
        new Shine.Config({
          // shadowRGB: new Shine.Color(255, 255, 255),
          numSteps: 30,
          offset: 0.3,
          blur: 100,
        }),
      );
    window.addEventListener('mousemove', handleMouseMove, false);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove, false);
    };
  }, []);

  return (
    <div
      className={classnames(
        styles['typed-title'],
        'animate__animated animate__repeat-1 animate__slow',
        'animate__flipInX',
      )}
      id="typed-title"
    >
      数据可视化大屏
    </div>
  );
};

export default AnimationTitle;
