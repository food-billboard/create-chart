import { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import { Switch, Drawer } from 'antd';
import { connect } from 'dva';
import Slider from '@/components/ChartComponents/Common/Slider';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Item } = ConfigList;

export type LensConfigRef = {
  open: () => void;
};

type Value = ComponentData.TScreenData['config']['attr']['lens'];

type Props = {
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  lens: Value;
};

const LensConfig = forwardRef<LensConfigRef, Props>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { lens, setScreen } = props;
  const {
    hueRotate,
    grayscale,
    contrast,
    opacity,
    brightness,
    saturate,
    show,
  } = lens;

  const onChange = useCallback(
    (key: keyof Value, value) => {
      let realValue = value;
      try {
        realValue = value.target.value;
      } catch (err) {}
      setScreen({
        config: {
          attr: {
            lens: {
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
      visible={visible}
      maskClosable={false}
      onClose={onClose}
      title="全局过滤器"
      placement="left"
      width={400}
    >
      <ConfigList level={1}>
        <Item label="开启全局滤镜">
          <FullForm>
            <Switch checked={show} onChange={onChange.bind(null, 'show')} />
          </FullForm>
        </Item>
        {!!show && (
          <>
            <Item label="色相">
              <FullForm>
                <Slider
                  min={-180}
                  max={180}
                  value={hueRotate}
                  onChange={onChange.bind(null, 'hueRotate')}
                />
              </FullForm>
            </Item>
            <Item label="饱和度">
              <FullForm>
                <Slider
                  min={0}
                  max={100}
                  value={saturate}
                  onChange={onChange.bind(null, 'saturate')}
                />
              </FullForm>
            </Item>
            <Item label="明度">
              <FullForm>
                <Slider
                  min={0}
                  max={100}
                  value={brightness}
                  onChange={onChange.bind(null, 'brightness')}
                />
              </FullForm>
            </Item>
            <Item label="对比度">
              <FullForm>
                <Slider
                  min={0}
                  max={100}
                  value={contrast}
                  onChange={onChange.bind(null, 'contrast')}
                />
              </FullForm>
            </Item>
            <Item label="透明度">
              <FullForm>
                <Slider
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={onChange.bind(null, 'opacity')}
                />
              </FullForm>
            </Item>
            <Item label="灰度">
              <FullForm>
                <Slider
                  min={0}
                  max={100}
                  value={grayscale}
                  onChange={onChange.bind(null, 'grayscale')}
                />
              </FullForm>
            </Item>
          </>
        )}
      </ConfigList>
    </Drawer>
  );
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(LensConfig);
