import { Radio, Space, App } from 'antd';
import classnames from 'classnames';
import { useCallback } from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { sleep } from '@/utils';
import ComponentThemeChange from '@/utils/Assist/Component/ComponentThemeChange';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import ThemeUtil, { DEFAULT_THEME_NAME } from '@/utils/Assist/Theme';
import ColorItem from '../ColorItem';
import UploadImage from './UploadImage';
import styles from './index.less';

const generateName = () => `custom_${Date.now()}`;

const CustomConfig = (props: {
  theme: ComponentData.TScreenTheme;
  setScreen: (value: any) => void;
  setComponent: ComponentMethod.SetComponentMethod;
  setLoading: (loading: boolean) => void;
}) => {
  const { theme, setScreen, setComponent, setLoading } = props;
  const { color = [], value: currentThemeName } = theme;

  const { message } = App.useApp();

  const setScreenTheme = useCallback(
    (themeConfig: Partial<ComponentData.TScreenTheme>) => {
      setScreen({
        config: {
          attr: {
            theme: themeConfig,
          },
        },
      });
    },
    [],
  );

  const updateScreenThemeState = useCallback(
    async (themeConfig: ComponentData.TScreenTheme) => {
      // 更改色调
      await ThemeUtil.initCurrentThemeData(themeConfig, true, true);

      // 修改组件颜色
      setComponent(ComponentThemeChange(themeConfig.value));
      // 通知组件更新
      GLOBAL_EVENT_EMITTER.emitDebounce(EVENT_NAME_MAP.SCREEN_THEME_CHANGE);
    },
    [],
  );

  const handleSelectTheme = useCallback(
    async (value, newColorData = null) => {
      setLoading(true);
      const realColor = newColorData || color;
      const { label: themeName } = value;
      const changeData: Partial<ComponentData.TScreenTheme> = {
        value: themeName,
      };
      if (newColorData) {
        changeData.color = [...realColor];
      }

      setScreenTheme(changeData);

      sleep(500)
        .then(() => {
          return updateScreenThemeState({
            value: themeName,
            color: realColor,
          });
        })
        .then(() => {
          setLoading(false);
        });
    },
    [color, setScreenTheme, updateScreenThemeState],
  );

  const onColorChange = useCallback(
    async (themeData, isSelect, value) => {
      const { label } = themeData;
      const {
        originLabel,
        label: currentLabel,
        value: newColorValue,
        isDelete,
      } = value;
      const realLabel = originLabel || label;
      const targetThemDataIndex = color.findIndex(
        (item) => item.label === realLabel,
      );
      if (!~targetThemDataIndex) return;
      // 删除
      if (isDelete) {
        color.splice(targetThemDataIndex, 1);
        const changeData: ComponentData.TScreenTheme = {
          color: [...color],
          value: currentThemeName,
        };
        if (isSelect) {
          changeData.value = DEFAULT_THEME_NAME;
        }
        setScreenTheme(changeData);

        // ? 选中状态的情况下删除需要重置为默认的主题
        if (isSelect) {
          message.info('删除主题成功，正在加载默认主题');
          await updateScreenThemeState(changeData);
        }
      } else {
        const targetThemData = color[targetThemDataIndex];
        // 修改颜色
        if (newColorValue) targetThemData.value = newColorValue;
        // 修改名称
        if (currentLabel) {
          targetThemData.label = currentLabel;
        }
        color[targetThemDataIndex] = { ...targetThemData };
        // 如果选中则立刻刷新保存数据
        if (isSelect) {
          handleSelectTheme(targetThemData, color);
        } else {
          setScreenTheme({
            color: [...color],
          });
        }
      }
    },
    [color, currentThemeName],
  );

  return (
    <div className={styles['designer-theme-config-custom']}>
      <UploadImage
        onChange={(value) => {
          if (value.length)
            setScreenTheme({
              color: [
                {
                  label: generateName(),
                  value: value[0],
                },
                ...color,
              ],
            });
        }}
      />
      <Space direction="vertical" className="w-100">
        {color.map((item) => {
          const { label, value: colorValue } = item;
          const checked = currentThemeName === label;
          return (
            <div
              className={classnames(
                'w-100 dis-flex',
                styles['designer-theme-config-custom-item'],
              )}
              key={label}
            >
              <div className="m-r-4">
                <Radio
                  checked={checked}
                  onChange={handleSelectTheme.bind(null, item, null)}
                />
              </div>
              <div className="w-100 h-100">
                <ColorItem
                  name={label}
                  value={colorValue}
                  checked={checked}
                  editable
                  onChange={onColorChange.bind(null, item, checked)}
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
  (dispatch: any) => {
    return {
      setScreen: (value: any) => dispatch({ type: 'global/setScreen', value }),
      setComponent: (value: any) =>
        dispatch({ type: 'global/setComponent', value }),
    };
  },
)(CustomConfig);
