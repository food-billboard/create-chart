import { useState } from 'react';
import { Space } from 'antd';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import ThemeUtil from '@/utils/Assist/Theme';
import ComponentThemeChange from '@/utils/Assist/Component/ComponentThemeChange';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import UploadImage from './UploadImage';
import ColorItem from '../ColorItem';
import styles from './index.less';

const CustomConfig = (props: {
  theme: ComponentData.TScreenTheme;
  setScreen: (value: any) => void;
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { theme, setScreen, setComponent } = props;

  const [colorList, setColorList] = useState<string[][]>(
    theme.color ? [theme.color] : [],
  );
  const [themeName, setThemeName] = useState<string>(theme.value);

  return (
    <div className={styles['designer-theme-config-custom']}>
      <UploadImage
        onChange={(value) => {
          setColorList(value);
          setThemeName(`custom_${Date.now()}`);
        }}
      />
      <Space direction="vertical" className="w-100">
        {colorList.map((item) => {
          return (
            <ColorItem
              key="custom"
              name={'custom'}
              value={item}
              checked={theme.type === 'custom' && theme.value === themeName}
              onClick={() => {
                setScreen({
                  config: {
                    attr: {
                      theme: {
                        type: 'custom',
                        value: themeName,
                        color: item,
                      },
                    },
                  },
                });
                // 更改色调
                ThemeUtil.initCurrentThemeData({
                  type: 'custom',
                  value: themeName,
                  color: item,
                });
                // 修改组件颜色
                setComponent(ComponentThemeChange(themeName));
                // 通知组件更新
                GLOBAL_EVENT_EMITTER.emitDebounce(
                  EVENT_NAME_MAP.SCREEN_THEME_CHANGE,
                );
              }}
            />
          );
        })}
      </Space>
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      theme: state.global.screenData.config.attr.theme,
    };
  },
  (dispatch) => {
    return {
      setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
      setComponent: (value: any) =>
        dispatch({ type: 'global/setComponent', value }),
    };
  },
)(CustomConfig);
