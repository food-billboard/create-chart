import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { Form, Space, Row, Col } from 'antd';
// @ts-ignore
import Parallax from 'parallax-js';
import circleImage from '../../../../../public/login/login-left-circle.png';
import animationImageMain from '../../../../../public/login/login-background-main.png';
import logo from '../../../../../public/logo.jpg';
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
    <div
      className={classnames(styles['login-form-background'], className)}
      style={style}
      onSubmit={onSubmit}
    >
      <div>
        <div
          className={classnames(styles['login-form-background-wrapper'])}
          id="login-form-background"
        >
          <div className={classnames(styles['login-form-background-circle'])}>
            <div>
              <img src={circleImage} />
            </div>
          </div>
          <div className={styles['login-form-background-main']}>
            <Row
              style={{ margin: 0 }}
              gutter={24}
              className={classnames(
                'w-100',
                styles['login-form-background-main-row'],
              )}
            >
              <Col
                style={{ padding: 0 }}
                span={16}
                className={classnames(
                  styles['login-form-background-main-col'],
                  PARALLAX_CLASS_NAME,
                )}
                data-depth="0.3"
              >
                <div
                  className={classnames(
                    styles['login-form-background-info'],
                    'w-100',
                    'h-100',
                  )}
                >
                  <div className="pos-re w-100 h-100">
                    {/* <div
                      data-depth="0.5"
                      data-invert-x="true"
                      className={classnames(styles['login-form-background-info-animation'], PARALLAX_CLASS_NAME)}
                    >
                      <div>
                        <img
                          src={animationImageBottom}
                        />
                      </div>
                    </div>
                    <div
                      className={classnames(PARALLAX_CLASS_NAME, styles['login-form-background-info-animation'])}
                      data-invert-y="true"
                      data-depth="0.55"
                    >
                      <div>
                        <img
                          src={animationImageTop}
                        />
                      </div>
                    </div>
                    <div
                      className={classnames(styles['login-form-background-info-animation'], PARALLAX_CLASS_NAME)}
                      data-depth="0.6"
                      data-invert-x="true"
                      data-invert-y="true"
                    >
                      <div>
                        <img
                          src={animationImageSmall}
                        />
                      </div>
                    </div> */}
                    <div
                      className={classnames(
                        styles['login-form-background-info-animation'],
                      )}
                    >
                      <div>
                        <img src={animationImageMain} />
                      </div>
                    </div>

                    <div
                      className={classnames(
                        styles['login-form-background-info-logo'],
                        'pos-re',
                      )}
                    >
                      <div>
                        <img src={logo} />
                      </div>
                    </div>
                    <div
                      className={classnames(
                        styles['login-form-background-info-title'],
                        'pos-re',
                      )}
                    >
                      <div>?????????????????????????????????</div>
                    </div>
                    <div
                      className={classnames(
                        styles['login-form-background-info-sub-title'],
                        'pos-re',
                      )}
                    >
                      <div>{/* TODO */}</div>
                    </div>
                    <div
                      className={styles['login-form-background-info-prefix']}
                    ></div>
                  </div>
                </div>
              </Col>
              <Col
                style={{ padding: 0 }}
                span={8}
                className={styles['login-form-background-main-col']}
              >
                <div className={styles['login-form-main']}>
                  <div className={styles['login-form-main-title']}>{title}</div>
                  <div className={styles['login-form-main-sub-title']}>
                    {subTitle}
                  </div>
                  <div className={styles['login-form-main-content']}>
                    <Form>
                      <Space className="w-100" direction="vertical">
                        {children}
                      </Space>
                    </Form>
                  </div>
                  <div className={styles['login-form-main-tips']}>{tips}</div>
                  <div className={styles['login-form-main-action']}>
                    {action}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBackground;
