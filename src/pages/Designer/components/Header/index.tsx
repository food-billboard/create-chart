import { useMemo, useState, useCallback } from 'react';
import { PageHeader, Input, Button, message } from 'antd';
import { SendOutlined, FundOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import { previewScreen, previewScreenModel } from '@/services';
import { goPreview, goPreviewModel } from '@/utils/tool';
import { isModelHash } from '@/hooks';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { saveScreenData } from '@/utils/Assist/DataChangePool';
import { mapDispatchToProps, mapStateToProps } from './connect';
import ActionList from './ActionList';
import styles from './index.less';

const Header = (props: {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  setScreen?: (data: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const { screenData, setScreen } = props;
  const { name, _id } = screenData || {};
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

  const handleStore = useCallback(async () => {
    await saveScreenData({
      loading: fetchLoading,
      setLoading: setFetchLoading,
    });
  }, [fetchLoading]);

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
    if (!GlobalConfig.isAutoSaveType()) {
      if (!_id) return [storeButton];
      return [previewButton, storeButton];
    } else {
      if (!!_id) return [previewButton];
      return [];
    }
  }, [handlePreview, handleStore, _id, fetchLoading]);

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
