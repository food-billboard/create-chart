import { useMemo, useState, useCallback } from 'react';
import { PageHeader, Input, Button } from 'antd';
import { SendOutlined, FundOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import classnames from 'classnames';
import FocusWrapper from '@/components/FocusWrapper';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const Header = (props: {
  name?: string;
  setScreen?: (data: { name: string }) => void;
}) => {
  const { name, setScreen } = props;
  const [editMode, setEditMode] = useState<boolean>(false);

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

  const handlePreview = useCallback(() => {}, []);

  const handleSend = useCallback(() => {}, []);

  const extra = useMemo(() => {
    return [
      <Button
        key="preview"
        size="large"
        title="预览"
        type="link"
        onClick={handlePreview}
        icon={<FundOutlined />}
      ></Button>,
      <Button
        key="send"
        size="large"
        title="发布"
        type="link"
        onClick={handleSend}
        icon={<SendOutlined />}
      ></Button>,
    ];
  }, [handlePreview, handleSend]);

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
