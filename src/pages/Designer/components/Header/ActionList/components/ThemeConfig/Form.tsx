import { InfoCircleOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Drawer, Space, Tabs } from 'antd';
import classnames from 'classnames';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { connect } from 'umi';
import { Loading } from '@/components/PageLoading';
import { sleep } from '@/utils';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorItem from './ColorItem';
import CustomConfig from './CustomConfig';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

export type ThemeConfigRef = {
  open: () => void;
};

type Props = {
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  theme: ComponentData.TScreenTheme;
  setSelect: (select: string[]) => void;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
};

const ThemeConfig = forwardRef<ThemeConfigRef, Props>((props, ref) => {
  const [visible, setVisible] = useControllableValue<boolean>(props, {
    trigger: 'onVisibleChange',
    valuePropName: 'visible',
  });
  const [changeLoading, setChangeLoading] = useState(false);

  const { theme, setScreen, setSelect } = props;
  const { value, color } = theme;

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
    (value) => {
      setChangeLoading(() => true);

      sleep(500)
        .then(() => {
          // 更改色调
          return ThemeUtil.initCurrentThemeDataAndUpdateScreenData({
            themeConfig: {
              value,
              color,
            },
            needNotRequest: false,
          });
        })
        .then(() => {
          setChangeLoading(() => false);
        });
    },
    [setScreen, color],
  );

  const open = () => {
    setSelect([]);
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
      open={visible}
      maskClosable={false}
      onClose={onClose}
      title="主题色修改"
      placement="left"
      width={400}
      styles={{
        body: {
          position: 'relative',
          pointerEvents: changeLoading ? 'none' : 'all',
        },
      }}
      destroyOnClose
    >
      {changeLoading && (
        <div
          className={classnames(
            styles['designer-theme-config-loading'],
            'w-100 h-100 pos-ab',
          )}
        >
          <Loading size={25} />
        </div>
      )}
      <div className="m-b-4">
        <InfoCircleOutlined className="m-r-4" />{' '}
        此处设置的主题会被地址上的主题设置覆盖
      </div>
      <Tabs
        className={styles['designer-theme-config']}
        centered
        defaultActiveKey={
          ThemeUtil.isInternalThemeName(value) ? 'internal' : 'custom'
        }
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
                      onClick={onChange.bind(null, theme)}
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
            children: <CustomConfig setLoading={setChangeLoading} />,
          },
        ]}
      />
    </Drawer>
  );
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true,
})(ThemeConfig);
