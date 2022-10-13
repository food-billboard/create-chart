import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Space, Drawer, Tabs, Row, Col } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import getImageColor from '@/utils/getImageColor';
import ThemeUtil from '@/utils/Assist/Theme';
import ComponentThemeChange from '@/utils/Assist/Component/ComponentThemeChange';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { TabPane } = Tabs;

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
    (
      key: keyof ComponentData.TScreenTheme,
      type: ComponentData.TScreenTheme['type'],
      value,
    ) => {
      let realValue = value;
      try {
        realValue = value.target.value;
      } catch (err) {}
      setScreen({
        config: {
          attr: {
            theme: {
              type,
              [key]: realValue,
            },
          },
        },
      });
      // 更改色调
      ThemeUtil.initCurrentThemeData(type);
      // 修改组件颜色
      setComponent(ComponentThemeChange(realValue));
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
        items={[
          {
            key: '0',
            label: '主题色选择',
            children: (
              <Space direction="vertical" className="w-100 h-100">
                {Object.entries(COLOR_MAP).map((item) => {
                  const [theme, colorList] = item;
                  const span = 24 / colorList.length;
                  return (
                    <Row
                      gutter={24}
                      className={classnames(
                        {
                          [styles['designer-theme-config-list-check']]:
                            value === theme,
                        },
                        styles['designer-theme-config-list'],
                      )}
                      key={theme}
                      onClick={() => onChange('value', 'internal', theme)}
                    >
                      {colorList.map((item) => {
                        return (
                          <Col span={span} key={item}>
                            <div
                              className={styles['designer-theme-config-item']}
                              style={{
                                backgroundColor: item,
                              }}
                            ></div>
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
              </Space>
            ),
          },
          {
            key: '1',
            label: '自定义主题',
            children: <div></div>,
          },
        ]}
      />
    </Drawer>
  );
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ThemeConfig);
