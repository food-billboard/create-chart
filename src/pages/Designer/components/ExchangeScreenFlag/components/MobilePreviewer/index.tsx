import { Drawer, App } from 'antd';
import classnames from 'classnames';
import { noop } from 'lodash';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { connect } from 'umi';
import { getComponentByType } from '@/components/ChartComponents';
import GlobalLoadingActionButton from '@/components/GlobalLoadingActionButton';
import { InternalBorderWrapper } from '@/components/InternalBorder';
import { Loading } from '@/components/PageLoading';
import { ConnectState } from '@/models/connect';
import { putScreen, putScreenModel } from '@/services';
import { mergeWithoutArray } from '@/utils';
import { ComponentTransformOriginChange } from '@/utils/Assist/BreakingChange';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import LocalConfigInstance, { LocalConfig } from '@/utils/Assist/LocalConfig';
import { NormalPainter } from '../../../Panel/components/Painter';
import { ExchangePreviewerContext } from './context';
import styles from './index.less';

const _ComponentList = (props: {
  value: ComponentData.TComponentData[];
  screenTheme: string;
  version: string;
}) => {
  const { value, version, screenTheme } = props;

  // * 1.5版本以后设置成中心位置
  const transformOrigin = useMemo(() => {
    return ComponentTransformOriginChange(version);
  }, [version]);

  return (
    <>
      {value.map((item) => {
        const {
          config: {
            style: { width, height, rotate, skew, opacity },
            attr: { visible },
          },
          id,
        } = item;
        const TargetComponent: any = getComponentByType(item)?.render;
        if (!TargetComponent) return null;

        const viewportQuery = `exchange-mobile-component-${id}`;

        return (
          <div
            key={id}
            style={{
              width,
              height,
              transform: `rotate(${rotate}deg) skew(${skew?.x || 0}deg, ${
                skew?.y || 0
              }deg)`,
              visibility: visible ? 'visible' : 'hidden',
              transformOrigin,
              opacity,
            }}
            id={viewportQuery}
            className={
              styles['component-exchange-screen-flag-component-list-item']
            }
          >
            <TargetComponent
              viewportQuery={`#${viewportQuery}`}
              className={styles['render-component-children']}
              value={item}
              key={id}
              wrapper={InternalBorderWrapper}
              global={{
                setParams: noop,
                screenType: 'preview',
                screenTheme,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

const ComponentList = connect(
  (state: ConnectState) => {
    return {
      version: state.global.version || '',
      screenTheme: state.global.screenData.config.attr.theme.value,
    };
  },
  () => ({}),
)(_ComponentList);

export type MobilePreviewerRef = {
  open: () => void;
};

const MobilePreviewer = forwardRef<MobilePreviewerRef, {}>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [componentList, setComponentList] = useState<
    ComponentData.TComponentData[]
  >([]);

  const { message } = App.useApp();

  const exchangeMobileComponents = (
    components: ComponentData.TComponentData[],
    scale: { x: number; y: number } = { x: 1, y: 1 },
  ) => {
    return components.reduce<ComponentData.TComponentData[]>((acc, cur) => {
      const {
        components = [],
        config: {
          style: { width, height },
          attr: { scaleX = 1, scaleY = 1 },
        },
        componentType,
      } = cur;
      const realHeight = (375 / width) * scale.x * height * scale.y;
      if (componentType !== 'GROUP_COMPONENT')
        acc.push(
          mergeWithoutArray({}, cur, {
            components: [],
            config: {
              style: {
                width: 375,
                height: realHeight,
                left: 0,
                top: 0,
              },
            },
          }),
        );
      acc.push(
        ...exchangeMobileComponents(components, {
          x: scaleX * scale.x,
          y: scaleY * scale.y,
        }),
      );
      return acc;
    }, []);
  };

  const open = useCallback(() => {
    setVisible(true);
    setLoading(true);
    const components = getDvaGlobalModelData().components;
    setComponentList(exchangeMobileComponents(components));
    setLoading(false);
  }, []);

  const handleClose = useCallback(async () => {
    setVisible(false);
  }, []);

  const handleOkStatic = useCallback(async () => {
    setLoading(true);
    try {
      const { errMsg, value } = await LocalConfigInstance.getItem(
        LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
      );
      if (errMsg) throw new Error((errMsg as any).toString());
      const { errMsg: setErr } = await LocalConfigInstance.setItem(
        LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
        mergeWithoutArray({}, value, {
          config: {
            style: {
              width: 375,
              height: 667,
            },
            flag: {
              type: 'H5',
            },
          },
        }),
      );

      if (setErr) throw new Error((setErr as any).toString());

      message.success('转换成功，即将刷新', 1, () => {
        window.location.reload();
      });
    } catch (err) {
      message.info('转换失败!!');
      setLoading(false);
    }
  }, [componentList]);

  const handleOkNormal = useCallback(async () => {
    setLoading(true);
    try {
      const { screenData } = getDvaGlobalModelData();
      const method = location.href.includes('/model-designer')
        ? putScreenModel
        : putScreen;
      await method({
        _id: screenData._id || '',
        name: screenData.name,
        description: screenData.description,
        poster: screenData.poster,
        flag: 'H5',
        data: JSON.stringify(
          mergeWithoutArray({}, screenData, {
            config: {
              style: {
                width: 375,
                height: 667,
              },
              flag: {
                type: 'H5',
              },
            },
            components: componentList,
          }),
        ),
      });
      message.success('转换成功，即将刷新', 1, () => {
        window.location.reload();
      });
    } catch (err) {
      message.info('转换失败!!');
      setLoading(false);
    }
  }, [componentList]);

  const handleOkImprove = useCallback(async () => {}, []);

  const handleOk = useCallback(() => {
    if (GlobalConfig.IS_STATIC) {
      return handleOkStatic();
    } else if (GlobalConfig.IS_IMPROVE_BACKEND) {
      return handleOkImprove();
    } else {
      return handleOkNormal();
    }
  }, [handleOkNormal, handleOkStatic, handleOkImprove]);

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
      title="移动端转换"
      onClose={handleClose}
      placement="left"
      width={375 + 48}
      maskClosable={false}
      destroyOnClose
      footer={
        <div className={styles['component-exchange-screen-flag-drawer-footer']}>
          <GlobalLoadingActionButton
            className="m-r-4"
            onClick={handleClose}
            loading={loading}
            needLoading={false}
            force
          >
            取消
          </GlobalLoadingActionButton>
          <GlobalLoadingActionButton
            type="primary"
            onClick={handleOk}
            loading={loading}
          >
            确认应用
          </GlobalLoadingActionButton>
        </div>
      }
    >
      <div
        className={classnames(
          styles['component-exchange-screen-flag-drawer'],
          'pos-re',
        )}
      >
        {loading && (
          <div
            className={classnames(
              styles['component-exchange-screen-flag-drawer-loading'],
              'pos-ab w-100 h-100',
            )}
          >
            <Loading />
          </div>
        )}
        {!loading && (
          <ExchangePreviewerContext.Provider
            value={{
              flag: 'H5',
            }}
          >
            <NormalPainter>
              <ComponentList value={componentList || []} />
            </NormalPainter>
          </ExchangePreviewerContext.Provider>
        )}
      </div>
    </Drawer>
  );
});

export default MobilePreviewer;
