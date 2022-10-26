import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Space, Drawer, Tabs } from 'antd';
import { connect } from 'dva';
import ThemeUtil from '@/utils/Assist/Theme';
import ComponentThemeChange from '@/utils/Assist/Component/ComponentThemeChange';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import ColorItem from './ColorItem';
import CustomConfig from './CustomConfig';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

export type ThemeConfigRef = {
  open: () => void;
};

type Props = {
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  setComponent: ComponentMethod.SetComponentMethod;
  theme: ComponentData.TScreenTheme;
};

const ThemeConfig = forwardRef<ThemeConfigRef, Props>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { theme, setScreen, setComponent } = props;
  const { type, value, color = [] } = theme;

  const COLOR_MAP: {
    [key: string]: string[];
  } = useMemo(() => {
    return ThemeUtil.themeNameList.reduce<any>((acc, cur) => {
      if (ThemeUtil.isInternalThemeName(cur))
        acc[cur] = ThemeUtil.getThemeColorList(cur).slice(0, 6);
      return acc;
    }, {});
  }, []);

  const onChange = useCallback(
    (type: ComponentData.TScreenTheme['type'], value) => {
      let realValue = value;
      try {
        realValue = value.target.value;
      } catch (err) {}
      setScreen({
        config: {
          attr: {
            theme: {
              type,
              value: realValue,
            },
          },
        },
      });
      // 更改色调
      ThemeUtil.initCurrentThemeData(realValue);
      // 修改组件颜色
      setComponent(ComponentThemeChange(realValue));
      // 通知组件更新
      GLOBAL_EVENT_EMITTER.emitDebounce(EVENT_NAME_MAP.SCREEN_THEME_CHANGE);
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
      title="主题色修改"
      placement="left"
      width={400}
    >
      <Tabs
        className={styles['designer-theme-config']}
        centered
        defaultActiveKey={type}
        items={[
          {
            key: 'internal',
            label: '主题色选择',
            children: (
              <Space direction="vertical" className="w-100 h-100">
                {Object.entries(COLOR_MAP).map((item) => {
                  const [theme, colorList] = item;
                  return (
                    <ColorItem
                      value={colorList}
                      name={theme}
                      onClick={onChange.bind(null, 'internal')}
                      checked={value === theme}
                      key={theme}
                    />
                  );
                })}
              </Space>
            ),
          },
          {
            key: 'custom',
            label: '自定义主题',
            forceRender: true,
            children: <CustomConfig />,
          },
        ]}
      />
    </Drawer>
  );
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ThemeConfig);
