import { useCallback, useMemo, useRef } from 'react';
import { Steps, Checkbox } from 'antd';
import { get } from 'lodash';
import json5 from 'json5';
import classnames from 'classnames';
import { useResponseData } from '@/hooks';
import AutoUpdate, { TValue } from './components/AutoUpdate';
import GhostButton from './components/GhostButton';
import CodeEditor from './components/CodeViewer';
import DataConfigDetail, {
  IDataConfigDetailRef,
} from './components/DataConfigDetail';
import styles from './index.less';

const { Step } = Steps;

const ResponseData = (props: {
  value: ComponentData.TComponentData;
  onChange?: (value: SuperPartial<ComponentData.TComponentData>) => void;
}) => {
  const { value, onChange } = props;

  const configDetailRef = useRef<IDataConfigDetailRef>(null);

  const apiTypeString = useMemo(() => {
    const requestType = get(value, 'config.data.request.type');
    if (requestType === 'api') return '接口数据';
    return '静态数据';
  }, [value]);

  const autoUpdateConfig = useMemo(() => {
    return get(value, 'config.data.request.frequency');
  }, [value]);

  const filterOpen = useMemo(() => {
    return get(value, 'config.data.filter.show');
  }, [value]);

  const dataConfigDetail = useMemo(() => {
    return value.config.data;
  }, [value]);

  const responseData = useResponseData(get(value, 'config.data') || {});

  const onDataConfigChange = useCallback(
    (value: SuperPartial<ComponentData.TComponentApiDataConfig>) => {
      onChange?.({
        config: {
          data: value,
        },
      });
    },
    [onChange],
  );

  const onAutoUpdateConfigChange = useCallback(
    (value: TValue) => {
      onChange?.({
        config: {
          data: {
            request: {
              frequency: value,
            },
          },
        },
      });
    },
    [onChange],
  );

  const onFilterConfigChange = useCallback(
    (e) => {
      const checked = e.target.checked;
      onChange?.({
        config: {
          data: {
            filter: {
              show: checked,
            },
          },
        },
      });
    },
    [onChange],
  );

  const openDataConfig = useCallback(() => {
    configDetailRef.current?.open();
  }, []);

  return (
    <div className={styles['design-config-response-data']}>
      <AutoUpdate
        value={autoUpdateConfig}
        onChange={onAutoUpdateConfigChange}
      />
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
            status={filterOpen ? 'finish' : 'wait'}
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
                  <Checkbox
                    checked={filterOpen}
                    onChange={onFilterConfigChange}
                  >
                    数据过滤器
                  </Checkbox>
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
        <CodeEditor value={value.config.data!} />
      </div>
      <DataConfigDetail
        ref={configDetailRef}
        value={dataConfigDetail!}
        onChange={onDataConfigChange}
      />
    </div>
  );
};

export default ResponseData;
