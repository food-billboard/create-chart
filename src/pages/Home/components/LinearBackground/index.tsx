import {} from 'react';
import classnames from 'classnames';
import styles from './index.less';

export const GridBackground = () => {
  return (
    <div className={styles['home-doodle-background']}>
      <css-doodle>{`
        :doodle {
          @grid: 20 / 100vmax;
        }
        @random { border-top: 2px solid white; }
        @random { border-left: 2px solid white; }
        @random(.2) {
          :after {
            content: '';
            background: hsl(@rand(360), 60%, 70%);
            @size: @rand(8px);
          }
        }
      `}</css-doodle>
    </div>
  );
};

const LinearBackground = () => {
  return (
    <div className={styles['home-linear-background']}>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-one'],
        )}
      ></div>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-two'],
        )}
      ></div>
      <div
        className={classnames(
          styles['home-linear-background-polygon'],
          styles['home-linear-background-polygon-three'],
        )}
      ></div>
    </div>
  );
};

export default LinearBackground;
