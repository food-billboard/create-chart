import { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Switch, Drawer, Select } from 'antd';
import { useMobxContext } from '@/hooks';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import CodeEditor from './CodeEditor';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import styles from './index.less';

const { Item } = ConfigList;

export type RequestCofigRef = {
  open: () => void;
};

type Props = {};

const RequestDefaultConfig = forwardRef<RequestCofigRef, Props>(
  (props, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const {
      global: {
        screenData: {
          config: {
            attr: { request },
          },
        },
        setScreen,
      },
    } = useMobxContext();

    const { method, headers, body, serviceRequest, frequency } = request;

    const onChange = useCallback(
      (key: keyof ComponentData.ScreenCommonRequestConfig, value) => {
        let realValue = value;
        try {
          realValue = value.target.value;
        } catch (err) {}
        setScreen({
          config: {
            attr: {
              request: {
                [key]: realValue,
              },
            },
          },
        });
      },
      [setScreen],
    );

    const open = () => {
      setVisible(true);
    };

    const onClose = useCallback(() => {
      setVisible(false);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
        };
      },
      [],
    );

    return (
      <Drawer
        mask={false}
        open={visible}
        maskClosable={false}
        onClose={onClose}
        title="默认请求配置"
        placement="left"
        width={400}
      >
        <ConfigList level={1}>
          <Item label="请求方法">
            <FullForm>
              <Select
                className="w-100 c-f-s"
                defaultValue="POST"
                value={method}
                onChange={onChange.bind(null, 'method')}
                options={[
                  {
                    value: 'POST',
                  },
                  {
                    value: 'GET',
                  },
                ]}
              />
            </FullForm>
          </Item>
          <Item label="请求头">
            <FullForm>
              <CodeEditor
                value={headers}
                onChange={onChange.bind(null, 'headers')}
              />
            </FullForm>
          </Item>
          <Item label="请求参数">
            <FullForm>
              <CodeEditor value={body} onChange={onChange.bind(null, 'body')} />
            </FullForm>
          </Item>
          <Item label="服务端请求">
            <FullForm>
              <Switch
                checked={serviceRequest}
                onChange={onChange.bind(null, 'serviceRequest')}
              />
            </FullForm>
          </Item>
          <Item label="自动更新请求">
            <HalfForm style={{ width: '30%' }}>
              <Switch
                checked={frequency.show}
                onChange={(value) =>
                  onChange('frequency', {
                    show: value,
                  })
                }
              />
            </HalfForm>
            <HalfForm style={{ width: '66%' }}>
              <InputNumber
                value={frequency.value || 0}
                disabled={!frequency.show}
                onChange={(value) =>
                  onChange('frequency', {
                    value,
                  })
                }
                controls={false}
                className={styles['request-default-config-frequency']}
              />
              <span className="c-f-s">{' 秒一次'}</span>
            </HalfForm>
          </Item>
        </ConfigList>
      </Drawer>
    );
  },
);

export default RequestDefaultConfig;
