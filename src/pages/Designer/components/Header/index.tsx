import { useMemo, useState } from 'react';
import { PageHeader, Input } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
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
          defaultValue={name}
          allowClear
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
          'p-4',
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

  return (
    <PageHeader
      className={styles['designer-page-header']}
      onBack={() => window.history.back()}
      title={Title}
    ></PageHeader>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
