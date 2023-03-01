import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  ForwardedRef,
} from 'react';
import { Switch, Drawer } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useMobxContext } from '@/hooks';
import Slider from '@/components/ChartComponents/Common/Slider';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import styles from './index.less';

const { Item } = ConfigList;

export type LensConfigRef = {
  open: () => void;
};

type Value = ComponentData.TScreenData['config']['attr']['lens'];

type Props = {};

const LensConfig = (props: Props, ref: ForwardedRef<LensConfigRef>) => {
  const [visible, setVisible] = useState<boolean>(false);

  const {
    global: {
      setScreen,
      screenData: {
        config: {
          attr: { lens },
        },
      },
    },
  } = useMobxContext();

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
      open={visible}
      maskClosable={false}
      onClose={onClose}
      title="全局滤镜"
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
                  min={0}
                  max={360}
                  value={hueRotate}
                  onChange={onChange.bind(null, 'hueRotate')}
                  className={classnames(
                    styles['designer-lens-config-hue-rotate'],
                    styles['designer-lens-config-common'],
                  )}
                />
              </FullForm>
            </Item>
            <Item label="饱和度">
              <FullForm>
                <Slider
                  min={0}
                  max={200}
                  value={saturate}
                  onChange={onChange.bind(null, 'saturate')}
                  className={classnames(
                    styles['designer-lens-config-saturate'],
                    styles['designer-lens-config-common'],
                  )}
                />
              </FullForm>
            </Item>
            <Item label="明度">
              <FullForm>
                <Slider
                  min={0}
                  max={200}
                  value={brightness}
                  onChange={onChange.bind(null, 'brightness')}
                  className={classnames(
                    styles['designer-lens-config-brightness'],
                    styles['designer-lens-config-common'],
                  )}
                />
              </FullForm>
            </Item>
            <Item label="对比度">
              <FullForm>
                <Slider
                  min={0}
                  max={200}
                  value={contrast}
                  onChange={onChange.bind(null, 'contrast')}
                  className={classnames(
                    styles['designer-lens-config-contrast'],
                    styles['designer-lens-config-common'],
                  )}
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
                  className={classnames(
                    styles['designer-lens-config-opacity'],
                    styles['designer-lens-config-common'],
                  )}
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
                  className={classnames(
                    styles['designer-lens-config-grayscale'],
                    styles['designer-lens-config-common'],
                  )}
                />
              </FullForm>
            </Item>
          </>
        )}
      </ConfigList>
    </Drawer>
  );
};

export default observer(LensConfig, { forwardRef: true });
