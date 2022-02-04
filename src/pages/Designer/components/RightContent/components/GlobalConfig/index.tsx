import { useCallback } from 'react';
import { InputNumber, Input, Tabs } from 'antd';
import { connect } from 'dva';
import { set } from 'lodash';
import BackgroundSelect from '@/components/BackgroundSelect';
import HalfForm from '../Common/Structure/HalfForm';
import FullForm from '../Common/Structure/FullForm';
import ConfigList from '../Common/Structure/ConfigList';
import ConfigWrapper from '../Common/ConfigWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';

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
      attr: { poster },
    },
    description,
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
    <div>
      <ConfigWrapper tabCounter={1}>
        <Tabs.TabPane tab="页面配置" key="1">
          <ConfigList>
            <Item label="屏幕大小">
              <HalfForm label="宽度">
                <InputNumber
                  defaultValue={width}
                  onBlur={onValueChange.bind(null, 'config.style.width')}
                />
              </HalfForm>
              <HalfForm label="高度">
                <InputNumber
                  defaultValue={height}
                  onBlur={onValueChange.bind(null, 'config.style.height')}
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
          </ConfigList>
        </Tabs.TabPane>
      </ConfigWrapper>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalConfig);
