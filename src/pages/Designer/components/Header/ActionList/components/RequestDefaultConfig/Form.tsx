import { useControllableValue } from 'ahooks';
import { Drawer, Switch } from 'antd';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { connect } from 'umi';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import CodeEditor from './CodeEditor';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const { Item } = ConfigList;

export type RequestConfigRef = {
  open: () => void;
};

type Props = {
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  request: ComponentData.ScreenCommonRequestConfig;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

const LensConfig = forwardRef<RequestConfigRef, Props>((props, ref) => {
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
  });

  const { request, setScreen } = props;
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
                  label: 'POST',
                },
                {
                  label: 'GET',
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
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true,
})(LensConfig);
