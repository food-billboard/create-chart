import {
  ExportOutlined,
  DesktopOutlined,
  ImportOutlined,
  SendOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Input, App } from 'antd';
import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import IconFont from '@/components/ChartComponents/Common/Icon';
import Marquee from '@/components/ChartComponents/Common/Marquee';
import FocusWrapper from '@/components/FocusWrapper';
import GlobalLoadingActonButton, {
  Props,
} from '@/components/GlobalLoadingActionButton';
import { useIsModelHash } from '@/hooks';
import { previewScreen, previewScreenModel } from '@/services';
import { saveScreenData } from '@/utils/Assist/DataChangePool';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { staticExportData, staticLeadIn } from '@/utils/Assist/LeadInAndOutput';
import { removeCurrentScreenData } from '@/utils/Assist/ScreenShotUtils';
import {
  goPreview,
  goPreviewModel,
  goView,
  goStaticProductionView,
} from '@/utils/tool';
import ExchangeScreenFlagButton from '../ExchangeScreenFlag';
import ActionList from './ActionList';
import ScreenShotManage from './ActionList/components/ScreenShotManage';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const Header = (props: {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  setScreen?: (data: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const { screenData, setScreen } = props;
  const {
    name,
    _id,
    config: {
      flag: { type },
    },
  } = screenData || {};

  const { message } = App.useApp();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const isModel = useIsModelHash();

  const Title = useMemo(() => {
    if (editMode) {
      return (
        <Input
          className={styles['designer-page-header-title-active']}
          defaultValue={name}
          allowClear
          autoFocus
          onBlur={(e) => {
            setScreen?.({
              name: e.target.value,
            });
            setEditMode(false);
          }}
        />
      );
    }

    return (
      <div
        className={classnames(
          styles['designer-page-header-title'],
          'border-1',
          'border-r-4',
          'c-po',
          'text-ellipsis',
        )}
        onClick={setEditMode.bind(null, true)}
      >
        {name}
      </div>
    );
  }, [editMode, name, setScreen]);

  const handlePreviewImprove = useCallback(async () => {}, []);

  const handlePreview = useCallback(async () => {
    // 纯前端大屏
    if (GlobalConfig.IS_STATIC) {
      return goView();
    }
    // improve大屏
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      return handlePreviewImprove();
    }

    setFetchLoading(true);
    try {
      // 大屏预览或模板预览
      const requestMethod = isModel ? previewScreenModel : previewScreen;
      const linkMethod = isModel ? goPreviewModel : goPreview;
      await requestMethod({ _id: _id as string });
      linkMethod(_id as string);
    } catch (err) {
      message.info('操作失败');
    } finally {
      setFetchLoading(false);
    }
  }, [_id, fetchLoading, isModel]);

  // 保存
  const handleStore = useCallback(async () => {
    return saveScreenData({
      loading: fetchLoading,
      setLoading: setFetchLoading,
    });
  }, [fetchLoading, handlePreviewImprove]);

  // 导入
  const handleImport = useCallback(async () => {
    setFetchLoading(true);
    try {
      staticLeadIn({
        onError: window.location.reload,
        onOk: () => {
          message.info('导入成功，即将刷新页面', 1, () => {
            window.location.reload();
          });
        },
      });
    } catch (err) {
      message.info('操作失败');
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // 导出
  const handleExport = useCallback(async () => {
    setFetchLoading(true);
    await staticExportData();
    setFetchLoading(false);
  }, []);

  // 初始化
  const handleReset = useCallback(async () => {
    setFetchLoading(true);
    try {
      await removeCurrentScreenData();
      message.info('操作成功，页面即将刷新', 1, () => window.location.reload());
    } catch (err) {
      message.info('操作出错');
    }
    setFetchLoading(false);
  }, []);

  const extra = useMemo(() => {
    const buttonProps: Props = {
      size: 'large',
      type: 'link',
      loading: fetchLoading,
    };
    const tooltipProps: Props['tooltip'] = {
      mouseLeaveDelay: 0.3,
    };
    const previewButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '预览',
        }}
        key="preview"
        title="预览"
        onClick={handlePreview}
        icon={<DesktopOutlined />}
        loading={fetchLoading}
      />
    );
    const productionPreviewButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '生产环境预览',
        }}
        key="production-preview"
        title="生产环境预览"
        onClick={goStaticProductionView}
        icon={<RocketOutlined />}
      ></GlobalLoadingActonButton>
    );
    const storeButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '保存',
        }}
        key="send"
        title="保存"
        onClick={handleStore}
        icon={<SendOutlined />}
      ></GlobalLoadingActonButton>
    );
    const exchangeScreenFlagButton = (
      <ExchangeScreenFlagButton
        key="exchange"
        loading={fetchLoading}
        setLoading={setFetchLoading}
      />
    );
    const exportScreenButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '导出',
        }}
        key="export"
        title="导出"
        onClick={handleExport}
        icon={<ExportOutlined />}
      ></GlobalLoadingActonButton>
    );
    const leadinScreenButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '导入',
        }}
        key="import"
        title="导入"
        onClick={handleImport}
        icon={<ImportOutlined />}
        id="static-import-button"
      ></GlobalLoadingActonButton>
    );
    const resetScreenButton = (
      <GlobalLoadingActonButton
        {...buttonProps}
        tooltip={{
          ...tooltipProps,
          title: '初始化',
        }}
        key="reset"
        title="初始化"
        onClick={handleReset}
        icon={<IconFont type="icon-Initialize-o" />}
      ></GlobalLoadingActonButton>
    );

    const screenShotManage = (
      <ScreenShotManage buttonProps={buttonProps} key="screen-shot" />
    );
    let baseList: any[] = [];
    // pc大屏有切换移动端
    if (type === 'PC') baseList.push(exchangeScreenFlagButton);
    // 不是自动保存
    if (!GlobalConfig.isAutoSaveType()) {
      if (!_id) {
        baseList.push(storeButton);
      } else {
        baseList.push(previewButton, storeButton);
      }
    } else {
      // 前端简化版大屏
      if (GlobalConfig.IS_STATIC) {
        baseList.push(
          exportScreenButton,
          leadinScreenButton,
          previewButton,
          productionPreviewButton,
          resetScreenButton,
        );
      }
      // improve大屏
      // ? 实时保存在localstorage，但是需要手动保存到后端
      else if (GlobalConfig.IS_IMPROVE_BACKEND) {
        baseList.push(previewButton, storeButton);
      } else {
        baseList.push(previewButton);
      }
    }
    if (
      GlobalConfig.IS_STATIC ||
      (GlobalConfig.IS_IMPROVE_BACKEND && !isModel)
    ) {
      baseList.push(screenShotManage);
    }
    return baseList;
  }, [
    handlePreview,
    handleStore,
    _id,
    fetchLoading,
    type,
    handleImport,
    handleExport,
    handleReset,
  ]);

  return (
    <FocusWrapper>
      <PageHeader
        className={styles['designer-page-header']}
        title={Title}
        extra={extra}
        backIcon={false}
        breadcrumbRender={() => {
          if (GlobalConfig.IS_STATIC) {
            return (
              <Marquee gradient={false} play pauseOnHover open>
                当前版本为简化版本，不存在网络交互，本地图片上传均转换为base64（推荐直接使用链接），所有功能均为纯前端实现，包括数据的存储，请及时对浏览器缓存进行处理。关于完整版本，请fork
                <a
                  href="https://github.com/food-billboard/create-chart"
                  target="blank"
                >
                  《github仓库》
                </a>
                代码在本地运行。
                可以将本地的大屏配置文件导入的设计器当中，预览的数据也会跟着改变。
              </Marquee>
            );
          }
          if (GlobalConfig.IS_IMPROVE_BACKEND) {
            return (
              <Marquee gradient={false} play pauseOnHover open>
                新版本的大屏的保存方式发生了变化，虽然是实时保存，但是它只是保存在本地，需要手动点击保存才可以真正保存。忘记点保存也没有关系，只要下次打开还是同一电脑的同一浏览器，记录就还是存在的。
              </Marquee>
            );
          }
          return null;
        }}
      >
        <ActionList />
      </PageHeader>
    </FocusWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
