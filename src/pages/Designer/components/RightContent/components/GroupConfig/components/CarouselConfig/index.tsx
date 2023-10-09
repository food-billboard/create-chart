import {
  BorderBottomOutlined,
  BorderHorizontalOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  BorderTopOutlined,
  BorderVerticleOutlined,
} from '@ant-design/icons';
import { useUpdate } from 'ahooks';
import { Switch } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import { SingleCollapse as Collapse } from '@/components/ChartComponents/Common/Collapse';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import Input from '@/components/ChartComponents/Common/Input';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import Select from '@/components/ChartComponents/Common/Select';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import GhostButton from '@/components/GhostButton';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import { ConnectState } from '@/models/connect';
import { getPath } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import ComponentList from './components/ComponentList';

const { Item } = ConfigList;

const CarouselConfig = (props: {
  component: ComponentData.TComponentData;
  flag: ComponentData.ScreenFlagType;
}) => {
  const forceUpdate = useUpdate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewAble, setPreviewAble] = useState(false);

  const { component } = props;

  const {
    id,
    config: {
      style: { groupCarousel },
    },
    components = [],
  } = component;

  const onChildComponentChange = useCallback(
    (
      target: ComponentData.TComponentData,
      key: keyof ComponentData.TComponentCarouselAnimationConfig,
      value: any,
    ) => {
      const componentPath = getPath(target.id);
      DataChangePool.setComponent({
        value: {
          config: {
            style: {
              carouselConfig: {
                [key]: value,
              },
            },
          },
        },
        id: target.id,
        path: componentPath,
        action: 'update',
      });
      forceUpdate();
    },
    [],
  );

  const targetComponent = useMemo(() => {
    return components[currentIndex];
  }, [components, currentIndex]);

  const {
    config: {
      style: { carouselConfig },
    },
  } = targetComponent;

  const onKeyChange = useCallback(
    (key: keyof ComponentData.TGroupComponentCarouselConfig, value: any) => {
      const componentPath = getPath(id);

      DataChangePool.setComponent({
        value: {
          config: {
            style: {
              groupCarousel: {
                [key]: value,
              },
            },
          },
        },
        id,
        path: componentPath,
        action: 'update',
      });
    },
    [id],
  );

  const onComponentIndexChange = useCallback(
    (index) => {
      if (currentIndex === index) return;
      setCurrentIndex(index);
      GLOBAL_EVENT_EMITTER.emit(
        EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_INDEX_CHANGE,
        index,
      );
    },
    [currentIndex],
  );

  const onPreviewAbleChange = useCallback(async () => {
    setPreviewAble(!previewAble);
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.GROUP_CAROUSEL_CLICK_PREVIEW_CHANGE,
      !previewAble,
    );
  }, [previewAble]);

  return (
    <ConfigList level={1}>
      <Item label="组内对象轮播">
        <FullForm>
          <Switch
            checked={groupCarousel!.show}
            onChange={onKeyChange.bind(null, 'show')}
          />
        </FullForm>
      </Item>
      {groupCarousel!.show && (
        <>
          <Collapse
            child={{
              header: '基础设置',
              key: 'base-config',
            }}
          >
            <Item label="组内对齐">
              <HalfForm label="水平">
                <RadioGroup
                  value={groupCarousel!.horizontalAlign}
                  onChange={onKeyChange.bind(null, 'horizontalAlign')}
                >
                  <Radio icon={<BorderLeftOutlined />} value="start"></Radio>
                  <Radio
                    icon={<BorderHorizontalOutlined />}
                    value="center"
                  ></Radio>
                  <Radio icon={<BorderRightOutlined />} value="end"></Radio>
                </RadioGroup>
              </HalfForm>
              <HalfForm label="垂直">
                <RadioGroup
                  value={groupCarousel!.verticalAlign}
                  onChange={onKeyChange.bind(null, 'verticalAlign')}
                >
                  <Radio icon={<BorderTopOutlined />} value="start"></Radio>
                  <Radio
                    icon={<BorderVerticleOutlined />}
                    value="center"
                  ></Radio>
                  <Radio icon={<BorderBottomOutlined />} value="end"></Radio>
                </RadioGroup>
              </HalfForm>
            </Item>
            <Item label="触发方式">
              <Select
                className="w-100"
                value={groupCarousel!.emitType}
                options={[
                  {
                    label: '自动触发',
                    value: 'auto',
                  },
                ]}
                onChange={onKeyChange.bind(null, 'emitType')}
              />
            </Item>
            {groupCarousel!.emitType === 'manual' && (
              <Item label="触发键">
                <Input
                  value={groupCarousel!.emitKeyboard}
                  onChange={onKeyChange.bind(null, 'emitKeyboard')}
                />
              </Item>
            )}
            <Item label="持续时长">
              <InputNumber
                value={groupCarousel!.delay}
                onChange={onKeyChange.bind(null, 'delay')}
              />
            </Item>
          </Collapse>
          <Collapse
            child={{
              header: '动画设置',
              key: 'animation-config',
            }}
            parent={{
              defaultActiveKey: ['animation-config'],
            }}
          >
            <ComponentList
              components={components}
              current={currentIndex}
              onChange={onComponentIndexChange}
              disabled={!!previewAble}
            />
            <Item label="动画">
              <FullForm>
                <Select
                  disabled={!!previewAble}
                  className="w-100"
                  options={[
                    {
                      label: '渐隐渐现',
                      value: 'fade',
                    },
                    {
                      label: '滑动',
                      value: 'slide',
                    },
                  ]}
                  value={carouselConfig.animation}
                  onChange={onChildComponentChange.bind(
                    null,
                    targetComponent,
                    'animation',
                  )}
                />
              </FullForm>
            </Item>
            <Item label="动画时长">
              <FullForm>
                <InputNumber
                  disabled={!!previewAble}
                  value={carouselConfig.speed}
                  onChange={onChildComponentChange.bind(
                    null,
                    targetComponent,
                    'speed',
                  )}
                />
              </FullForm>
            </Item>
            <Item label="缓动效果">
              <FullForm>
                <Select
                  disabled={!!previewAble}
                  className="w-100"
                  options={[
                    {
                      label: '线性',
                      value: 'linear',
                    },
                    {
                      label: '先慢后快',
                      value: 'ease-in',
                    },
                    {
                      label: '先快后慢',
                      value: 'ease-out',
                    },
                    {
                      label: '低速开始和结束',
                      value: 'ease-in-out',
                    },
                  ]}
                  value={carouselConfig.easing}
                  onChange={onChildComponentChange.bind(
                    null,
                    targetComponent,
                    'easing',
                  )}
                />
              </FullForm>
            </Item>
          </Collapse>
          <div className="ali-cen">
            <GlobalLoadingActonButton
              Component={GhostButton}
              onClick={onPreviewAbleChange}
            >
              {!!previewAble ? '暂停' : '预览'}
            </GlobalLoadingActonButton>
          </div>
        </>
      )}
    </ConfigList>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      flag: state.global.screenData.config.flag.type,
    };
  },
  () => ({}),
)(CarouselConfig);
