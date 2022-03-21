import { useMemo, useState, useCallback } from 'react';
import { PageHeader, Input, Button, message } from 'antd';
import { history } from 'umi';
import { SendOutlined, FundOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import { previewScreen, postScreen, putScreen } from '@/services';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const Header = (props: {
  screenData: Exclude<ComponentData.TScreenData, 'components'>;
  components: ComponentData.TComponentData[];
  setScreen?: (data: { name: string }) => void;
}) => {
  const { screenData, setScreen, components } = props;
  const { name, _id, description, config = {} } = screenData || {};
  const {
    attr: { poster },
  } = config as any;
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
      await previewScreen({ _id: _id as string });
      history.push({
        pathname: '/preview',
        query: {
          id: _id as string,
        },
      });
    } catch (err) {
      message.info('操作失败');
    } finally {
      setFetchLoading(false);
    }
  }, [_id, fetchLoading]);

  const handleStore = useCallback(async () => {
    if (fetchLoading) return;
    try {
      const params = {
        _id,
        name,
        description,
        poster,
        flag: 'PC',
        data: JSON.stringify({
          ...screenData,
          components,
        }),
      };
      const method = _id ? putScreen : postScreen;
      await method(params as any);
    } catch (err) {
      message.info('保存失败，请重试');
    } finally {
      setFetchLoading(false);
    }
  }, [components, description, fetchLoading, _id, name, screenData]);

  const extra = useMemo(() => {
    const previewButton = (
      <Button
        key="preview"
        size="large"
        title="预览"
        type="link"
        onClick={handlePreview}
        icon={<FundOutlined />}
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
      ></Button>
    );
    if (!_id) return [storeButton];
    return [previewButton, storeButton];
  }, [handlePreview, handleStore, _id]);

  return (
    <FocusWrapper>
      <PageHeader
        className={styles['designer-page-header']}
        onBack={() => window.history.back()}
        title={Title}
        extra={extra}
      ></PageHeader>
    </FocusWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
