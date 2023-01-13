import { useMemo, useState, useCallback } from 'react';
import { PageHeader, Input, Button, message } from 'antd';
import {
  SendOutlined,
  FundOutlined,
  ExportOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import { previewScreen, previewScreenModel } from '@/services';
import { goPreview, goPreviewModel } from '@/utils/tool';
import { isModelHash } from '@/hooks';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { saveScreenData } from '@/utils/Assist/DataChangePool';
import { staticExportData, staticLeadIn } from '@/utils/Assist/LeadInAndOutput';
import ExchangeScreenFlagButton from '../ExchangeScreenFlag';
import { mapDispatchToProps, mapStateToProps } from './connect';
import ActionList from './ActionList';
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const Title = useMemo(() => {
    if (editMode) {
      return (
        <Input
          className={styles['designer-page-header-title-active']}
          defaultValue={name}
          allowClear
          size="large"
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
        onClick={setEditMode.bind(null, true, undefined)}
      >
        {name}
      </div>
    );
  }, [editMode, name, setScreen]);

  const handlePreview = useCallback(async () => {
    if (fetchLoading) return;
    setFetchLoading(true);
    try {
      const isModel = isModelHash(location.hash);
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
  }, [_id, fetchLoading]);

  // 保存
  const handleStore = useCallback(async () => {
    await saveScreenData({
      loading: fetchLoading,
      setLoading: setFetchLoading,
    });
  }, [fetchLoading]);

  // 导入
  const handleImport = useCallback(async () => {
    setFetchLoading(true);
    try {
      staticLeadIn(window.location.reload);
    } catch (err) {
      message.info('操作失败');
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // 导出
  const handleExport = useCallback(async () => {
    setFetchLoading(false);
    await staticExportData();
    setFetchLoading(true);
  }, []);

  const extra = useMemo(() => {
    const previewButton = (
      <Button
        key="preview"
        size="large"
        title="预览"
        type="link"
        onClick={handlePreview}
        icon={<FundOutlined />}
        loading={fetchLoading}
      ></Button>
    );
    const storeButton = (
      <Button
        key="send"
        size="large"
        title="保存"
        type="link"
        onClick={handleStore}
        icon={<SendOutlined />}
        loading={fetchLoading}
      ></Button>
    );
    const exchangeScreenFlagButton = (
      <ExchangeScreenFlagButton
        key="exchange"
        loading={fetchLoading}
        setLoading={setFetchLoading}
      />
    );
    const exportScreenButton = (
      <Button
        key="export"
        size="large"
        title="导出"
        type="link"
        onClick={handleExport}
        icon={<ExportOutlined />}
        loading={fetchLoading}
      ></Button>
    );
    const leadinScreenButton = (
      <Button
        key="import"
        size="large"
        title="导入"
        type="link"
        onClick={handleImport}
        icon={<ImportOutlined />}
        loading={fetchLoading}
      ></Button>
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
      if (!!_id) {
        baseList.push(previewButton);
      }
      // 前端简化版大屏
      if (GlobalConfig.IS_STATIC) {
        baseList.push(exportScreenButton, leadinScreenButton);
      }
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
  ]);

  return (
    <FocusWrapper>
      <PageHeader
        className={styles['designer-page-header']}
        title={Title}
        extra={extra}
        backIcon={false}
      >
        <ActionList />
      </PageHeader>
    </FocusWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
