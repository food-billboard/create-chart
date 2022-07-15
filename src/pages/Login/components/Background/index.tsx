import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { Form, Space, Row, Col } from 'antd';
// @ts-ignore
import Parallax from 'parallax-js';
import EnterSubmitWrapper from '@/components/EnterSubmitWrapper';
import circleImage from '../../../../../public/login/login-left-circle.png';
import animationImageMain from '../../../../../public/login/login-main-background.png';
import animationImageTop from '../../../../../public/login/cloud-top.png';
import animationImageBottom from '../../../../../public/login/cloud-bottom.png';
import animationImageSmall from '../../../../../public/login/cloud-small.png';
import styles from '../../index.less';

const PARALLAX_CLASS_NAME = 'login-form-background-layer';

const CommonBackground = (props: {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  title?: ReactNode;
  subTitle?: ReactNode;
  tips?: ReactNode;
  action?: ReactNode;
  onSubmit?: () => void;
}) => {
  const {
    className,
    style,
    title,
    subTitle,
    children,
    tips,
    action,
    onSubmit,
  } = props;

  const parallaxRef = useRef<any>();

  useEffect(() => {
    parallaxRef.current = new Parallax(
      document.querySelector('#login-form-background'),
      {
        selector: `.${PARALLAX_CLASS_NAME}`,
      },
    );
  }, []);

  return (
    <EnterSubmitWrapper
      className={classnames(styles['login-form-background'], className)}
      style={style}
      onSubmit={onSubmit}
    >
      <div className="w-100 h-100 pos-re">
        <div
          className="pos-ab w-100 h-100"
          id="login-form-background"
          style={{
            pointerEvents: 'all',
          }}
        >
          <div className={classnames(styles['login-form-background-circle'])}>
            <img src={circleImage} />
          </div>
          <div className={styles['login-form-background-main']}>
            <Row gutter={24} className="w-100 h-100">
              <Col span={16}>
                <div
                  className={classnames(
                    styles['login-form-background-info'],
                    'w-100',
                    'h-100',
                  )}
                >
                  <div className="pos-re w-100 h-100">
                    <div
                      className={classnames(
                        styles['login-form-background-info-logo'],
                        'pos-re',
                      )}
                    >
                      <div className={PARALLAX_CLASS_NAME} data-depth="0.2">
                        SUPER SCREEN
                      </div>
                    </div>
                    <div
                      className={classnames(
                        styles['login-form-background-info-title'],
                        'pos-re',
                      )}
                    >
                      <div className={PARALLAX_CLASS_NAME} data-depth="0.3">
                        一串描述文字
                      </div>
                    </div>
                    <div
                      className={classnames(
                        styles['login-form-background-info-sub-title'],
                        'pos-re',
                      )}
                    >
                      <div data-depth="0.4" className={PARALLAX_CLASS_NAME}>
                        特殊的一些文字，每个页面不一样
                      </div>
                    </div>
                    <div
                      className={styles['login-form-background-info-prefix']}
                    ></div>
                    <div
                      className={classnames(
                        styles['login-form-background-info-animation'],
                        'pos-re',
                      )}
                    >
                      <div
                        className={
                          styles['login-form-background-info-animation-bottom']
                        }
                      >
                        <img
                          data-depth="0.5"
                          src={animationImageBottom}
                          className={PARALLAX_CLASS_NAME}
                          data-invert-x="true"
                        />
                      </div>
                      <div
                        className={
                          styles['login-form-background-info-animation-top']
                        }
                      >
                        <img
                          data-invert-y="true"
                          data-depth="0.55"
                          src={animationImageTop}
                          className={PARALLAX_CLASS_NAME}
                        />
                      </div>
                      <div
                        className={
                          styles['login-form-background-info-animation-small']
                        }
                      >
                        <img
                          data-depth="0.6"
                          src={animationImageSmall}
                          className={PARALLAX_CLASS_NAME}
                          data-invert-x="true"
                          data-invert-y="true"
                        />
                      </div>
                      <img
                        data-depth="0.65"
                        src={animationImageMain}
                        className={classnames(
                          styles['login-form-background-info-animation-main'],
                          PARALLAX_CLASS_NAME,
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={8}></Col>
            </Row>
          </div>
        </div>

        <div className={styles['login-form-main']}>
          <div className={styles['login-form-main-title']}>{title}</div>
          <div className={styles['login-form-main-sub-title']}>{subTitle}</div>
          <div className={styles['login-form-main-content']}>
            <Form>
              <Space className="w-100" direction="vertical">
                {children}
              </Space>
            </Form>
          </div>
          <div className={styles['login-form-main-tips']}>{tips}</div>
          <div className={styles['login-form-main-action']}>{action}</div>
        </div>
      </div>
    </EnterSubmitWrapper>
  );
};

export default CommonBackground;
