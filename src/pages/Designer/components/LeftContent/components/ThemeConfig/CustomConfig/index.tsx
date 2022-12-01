import { useState, useCallback } from 'react';
import { Space, Radio } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
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

const generateName = () => `custom_${Date.now()}`;

const CustomConfig = (props: {
  theme: ComponentData.TScreenTheme;
  setScreen: (value: any) => void;
  setComponent: ComponentMethod.SetComponentMethod;
}) => {
  const { theme, setScreen, setComponent } = props;

  const [colorList, setColorList] = useState<string[][]>(
    theme.color ? [theme.color] : [ThemeUtil.getThemeColorList(theme.value)],
  );
  const [themeName, setThemeName] = useState<string>(() => {
    return theme.type === 'custom' ? theme.value : generateName();
  });

  const handleSelectTheme = useCallback((value, themeName) => {
    setScreen({
      config: {
        attr: {
          theme: {
            type: 'custom',
            value: themeName,
            color: value,
          },
        },
      },
    });
    // 更改色调
    ThemeUtil.initCurrentThemeData({
      type: 'custom',
      value: themeName,
      color: value,
    });
    // 修改组件颜色
    setComponent(ComponentThemeChange(themeName));
    // 通知组件更新
    GLOBAL_EVENT_EMITTER.emitDebounce(EVENT_NAME_MAP.SCREEN_THEME_CHANGE);
  }, []);

  const onColorChange = useCallback(
    (index, isSelect, value) => {
      const newColorList = [...colorList];
      newColorList.splice(index, 1, value);
      setColorList(newColorList);
      // 如果选中则立刻刷新保存数据
      if (isSelect) {
        const themeName = generateName();
        setThemeName(themeName);
        handleSelectTheme(value, themeName);
      }
    },
    [colorList],
  );

  return (
    <div className={styles['designer-theme-config-custom']}>
      <UploadImage
        onChange={(value) => {
          setColorList(value);
          setThemeName(generateName());
        }}
      />
      <Space direction="vertical" className="w-100">
        {colorList.map((item, index) => {
          const checked = theme.type === 'custom' && theme.value === themeName;
          return (
            <div
              className={classnames(
                'w-100 dis-flex',
                styles['designer-theme-config-custom-item'],
              )}
              key="custom"
            >
              <div className="m-r-4">
                <Radio
                  checked={checked}
                  onChange={handleSelectTheme.bind(null, item, themeName)}
                />
              </div>
              <div className="w-100 h-100">
                <ColorItem
                  key="custom"
                  name={'custom'}
                  value={item}
                  checked={checked}
                  editable
                  onChange={onColorChange.bind(null, index, checked)}
                />
              </div>
            </div>
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
