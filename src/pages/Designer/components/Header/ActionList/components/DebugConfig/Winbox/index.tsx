import { InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import IconTooltip from '@/components/IconTooltip';
import WinBox from '@/components/Winbox';
import type { WinBoxRef } from '@/components/Winbox';
import type { ConnectState } from '@/models/connect';
import InsertComponent from './components/InsertComponent';

const { Item } = ConfigList;

export type { WinBoxRef } from '@/components/Winbox';

type Value = ConnectState['local']['debug'];

const Winbox = forwardRef<
  WinBoxRef,
  { debug: Value; onChange: (debug: SuperPartial<Value>) => void }
>((props, ref) => {
  const {
    debug: { show, showComponentId },
    onChange: propsOnChange,
  } = props;

  const boxRef = useRef<WinBoxRef>(null);

  const onChange = useCallback((key: keyof Value, value) => {
    let realValue = value;
    try {
      realValue = value.target.value;
    } catch (err) {}
    propsOnChange({
      [key]: realValue,
    });
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          boxRef.current?.open();
        },
      };
    },
    [],
  );

  return (
    <WinBox ref={boxRef} actionIgnore={['expand', 'full']}>
      <ConfigList level={1}>
        <Item label="开启Debug">
          <FullForm>
            <Switch checked={show} onChange={onChange.bind(null, 'show')} />
          </FullForm>
        </Item>
        {!!show && (
          <>
            <Item label="显示组件id">
              <FullForm>
                <Switch
                  checked={showComponentId}
                  onChange={onChange.bind(null, 'showComponentId')}
                />
              </FullForm>
            </Item>
            {process.env.NODE_ENV === 'development' && (
              <Item
                label="逐个添加组件"
                placeholder={
                  <IconTooltip title="此功能仅会在开发阶段显示">
                    <InfoCircleOutlined />
                  </IconTooltip>
                }
              >
                <FullForm>
                  <InsertComponent />
                </FullForm>
              </Item>
            )}
          </>
        )}
      </ConfigList>
    </WinBox>
  );
});

export default Winbox;
