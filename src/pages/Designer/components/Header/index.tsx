import { useMemo, useState } from 'react';
import { PageHeader, Input } from 'antd';
import styles from './index.less';

const Header = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const Title = useMemo(() => {
    return '';
  }, [editMode]);

  return (
    <PageHeader
      className={styles['designer-page-header']}
      onBack={() => window.history.back()}
      title={Title}
    ></PageHeader>
  );
};

export default Header;
