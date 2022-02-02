import { useCallback, useMemo, useRef } from 'react';
import { Steps, Checkbox } from 'antd';
import classnames from 'classnames';
import AutoUpdate from './components/AutoUpdate';
import GhostButton from './components/GhostButton';
import CodeEditor from './components/CodeViewer';
import DataConfigDetail, {
  IDataConfigDetailRef,
} from './components/DataConfigDetail';
import styles from './index.less';

const { Step } = Steps;

const ResponseData = (props: { value: {}; onChange: () => void }) => {
  const configDetailRef = useRef<IDataConfigDetailRef>(null);

  const apiTypeString = useMemo(() => {
    return '静态数据'; // api
  }, []);

  const openDataConfig = useCallback(() => {
    configDetailRef.current?.open();
  }, []);

  return (
    <div className={styles['design-config-response-data']}>
      <AutoUpdate />
      <div className={styles['design-config-response-data-step']}>
        <Steps progressDot current={2} direction="vertical">
          <Step
            title={
              <div
                className={classnames(
                  styles['design-config-response-data-step-item'],
                  'dis-flex',
                )}
              >
                <div
                  className={
                    styles['design-config-response-data-step-item-title']
                  }
                >
                  <span
                    className={
                      styles[
                        'design-config-response-data-step-item-title-type-txt'
                      ]
                    }
                  >
                    {apiTypeString}
                  </span>
                </div>
                <GhostButton onClick={openDataConfig}>配置数据源</GhostButton>
              </div>
            }
          />
          <Step
            title={
              <div
                className={classnames(
                  styles['design-config-response-data-step-item'],
                  'dis-flex',
                )}
              >
                <div
                  className={
                    styles['design-config-response-data-step-item-title']
                  }
                >
                  <Checkbox>数据过滤器</Checkbox>
                </div>
                <GhostButton onClick={openDataConfig}>添加过滤器</GhostButton>
              </div>
            }
          />
          <Step
            title={
              <div
                className={classnames(
                  styles['design-config-response-data-step-item'],
                  'dis-flex',
                )}
              >
                <div
                  className={
                    styles['design-config-response-data-step-item-title']
                  }
                >
                  <span>数据响应结果{'（ 只读 ）'}</span>
                </div>
              </div>
            }
          />
        </Steps>
      </div>
      <div className={styles['design-config-response-data-code-editor-view']}>
        <CodeEditor />
      </div>
      <DataConfigDetail ref={configDetailRef} />
    </div>
  );
};

export default ResponseData;
