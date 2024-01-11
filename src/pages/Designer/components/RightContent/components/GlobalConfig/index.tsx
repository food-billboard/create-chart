import { InfoCircleOutlined } from '@ant-design/icons';
import { Input, Switch } from 'antd';
import classnames from 'classnames';
import { set } from 'lodash';
import { useCallback, useMemo } from 'react';
import { connect } from 'umi';
import BackgroundSelect from '@/components/BackgroundSelect';
import ConfigWrapper, {
  ConfigItem,
} from '@/components/ChartComponents/Common/ConfigWrapper';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import CoverSelect from '@/components/CoverSelect';
import IconTooltip from '@/components/IconTooltip';
import ScaleConfig from './components/ScaleConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const { Item } = ConfigList;
const { TextArea } = Input;

const GlobalConfig = (props: {
  screenData: ComponentData.TScreenData;
  setScreenData: (value: SuperPartial<ComponentData.TScreenData>) => void;
}) => {
  const { screenData, setScreenData } = props;

  const {
    config: {
      style: { width, height, padding },
      attr: { poster, grid, componentBorder, scale = 'fit-height', waterMark },
      flag: { type },
    },
    description,
    poster: cover,
  } = screenData;

  const onValueChange = useCallback(
    (path: string, value: any) => {
      const newScreenData = {
        ...screenData,
      };
      let newValue = value;
      try {
        newValue = value.target.value;
      } catch (err) {}

      set(newScreenData, path, newValue);

      setScreenData(newScreenData);
    },
    [setScreenData, screenData],
  );

  return (
    <div className={classnames('h-100', styles['design-config-global'])}>
      <ConfigWrapper
        tabCounter={1}
        items={[
          {
            key: '1',
            label: '页面配置',
            children: (
              <ConfigItem>
                <ConfigList style={{ minHeight: '100%' }}>
                  {type !== 'H5' && (
                    <Item label="屏幕大小">
                      <HalfForm label="宽度">
                        <InputNumber
                          value={width}
                          onChange={onValueChange.bind(
                            null,
                            'config.style.width',
                          )}
                        />
                      </HalfForm>
                      <HalfForm label="高度">
                        <InputNumber
                          value={height}
                          onChange={onValueChange.bind(
                            null,
                            'config.style.height',
                          )}
                        />
                      </HalfForm>
                    </Item>
                  )}
                  <Item label="描述">
                    <FullForm>
                      <TextArea
                        defaultValue={description}
                        onBlur={onValueChange.bind(null, 'description')}
                      />
                    </FullForm>
                  </Item>
                  <Item label="背景">
                    <FullForm>
                      <BackgroundSelect
                        value={poster}
                        onChange={onValueChange.bind(
                          null,
                          'config.attr.poster',
                        )}
                      />
                    </FullForm>
                  </Item>
                  <Item
                    label="封面"
                    placeholder={
                      <IconTooltip title="设置保存时的封面，可以截图">
                        <InfoCircleOutlined />
                      </IconTooltip>
                    }
                  >
                    <FullForm>
                      <CoverSelect
                        value={cover}
                        onChange={onValueChange.bind(null, 'poster')}
                      />
                    </FullForm>
                  </Item>
                  <Item
                    label="组件边框"
                    placeholder={
                      <IconTooltip title="统一配置组件边框的样式">
                        <InfoCircleOutlined />
                      </IconTooltip>
                    }
                  >
                    <FullForm label="宽度">
                      <InputNumber
                        value={componentBorder.width}
                        onChange={onValueChange.bind(
                          null,
                          'config.attr.componentBorder.width',
                        )}
                      />
                    </FullForm>
                    <HalfForm label="横向间距">
                      <InputNumber
                        value={componentBorder.padding[0]}
                        onChange={(value) =>
                          onValueChange('config.attr.componentBorder.padding', [
                            value,
                            componentBorder.padding[1],
                          ])
                        }
                      />
                    </HalfForm>
                    <HalfForm label="纵向间距">
                      <InputNumber
                        value={componentBorder.padding[1]}
                        onChange={(value) =>
                          onValueChange('config.attr.componentBorder.padding', [
                            componentBorder.padding[0],
                            value,
                          ])
                        }
                      />
                    </HalfForm>
                  </Item>
                  <Item label="栅格">
                    <FullForm>
                      <InputNumber
                        value={grid || 1}
                        onChange={onValueChange.bind(null, 'config.attr.grid')}
                      />
                    </FullForm>
                  </Item>
                  {type === 'PC' && (
                    <Item label="页面缩放方式">
                      <FullForm>
                        <ScaleConfig
                          value={scale}
                          onChange={onValueChange.bind(
                            null,
                            'config.attr.scale',
                          )}
                        />
                      </FullForm>
                    </Item>
                  )}
                  <Item label="水印">
                    <FullForm>
                      <Switch
                        checked={!!waterMark}
                        onChange={onValueChange.bind(
                          null,
                          'config.attr.waterMark',
                        )}
                      />
                    </FullForm>
                  </Item>
                  {type === 'H5' && (
                    <Item label="间距">
                      <HalfForm label="上下">
                        <InputNumber
                          value={padding?.[0] || 0}
                          onChange={(value) =>
                            onValueChange('config.style.padding', [
                              value,
                              padding?.[1],
                            ])
                          }
                        />
                      </HalfForm>
                      <HalfForm label="左右">
                        <InputNumber
                          value={padding?.[1] || 0}
                          onChange={(value) =>
                            onValueChange('config.style.padding', [
                              padding?.[0],
                              value,
                            ])
                          }
                        />
                      </HalfForm>
                    </Item>
                  )}
                  {/* <Item label="主题">
                    <ThemeConfig
                      value={theme}
                      onChange={onValueChange.bind(null, 'config.attr.theme')}
                    />
                  </Item> */}
                </ConfigList>
              </ConfigItem>
            ),
          },
        ]}
      ></ConfigWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfig);
