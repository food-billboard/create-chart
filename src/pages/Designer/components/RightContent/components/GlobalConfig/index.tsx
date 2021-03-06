import { useCallback } from 'react';
import { Input, Tabs } from 'antd';
import { connect } from 'dva';
import { set } from 'lodash';
import classnames from 'classnames';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import BackgroundSelect from '@/components/BackgroundSelect';
import HalfForm from '@/components/ChartComponents/Common/Structure/HalfForm';
import FullForm from '@/components/ChartComponents/Common/Structure/FullForm';
import ConfigList from '@/components/ChartComponents/Common/Structure/ConfigList';
import ConfigWrapper from '@/components/ChartComponents/Common/ConfigWrapper';
import InputNumber from '@/components/ChartComponents/Common/InputNumber';
import CoverSelect from '@/components/CoverSelect';
import ThemeConfig from './components/ThemeConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
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
      style: { width, height },
      attr: { poster, theme, grid },
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
      <ConfigWrapper tabCounter={1}>
        <Tabs.TabPane tab="页面配置" key="1">
          <ConfigList style={{ minHeight: '100%' }}>
            <Item label="屏幕大小">
              <HalfForm label="宽度">
                <InputNumber
                  value={width}
                  onChange={onValueChange.bind(null, 'config.style.width')}
                />
              </HalfForm>
              <HalfForm label="高度">
                <InputNumber
                  value={height}
                  onChange={onValueChange.bind(null, 'config.style.height')}
                />
              </HalfForm>
            </Item>
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
                  onChange={onValueChange.bind(null, 'config.attr.poster')}
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
            <Item label="栅格">
              <FullForm>
                <InputNumber
                  value={grid || 1}
                  onChange={onValueChange.bind(null, 'config.attr.grid')}
                />
              </FullForm>
            </Item>
            <Item label="主题">
              <ThemeConfig
                value={theme}
                onChange={onValueChange.bind(null, 'config.attr.theme')}
              />
            </Item>
          </ConfigList>
        </Tabs.TabPane>
      </ConfigWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfig);
