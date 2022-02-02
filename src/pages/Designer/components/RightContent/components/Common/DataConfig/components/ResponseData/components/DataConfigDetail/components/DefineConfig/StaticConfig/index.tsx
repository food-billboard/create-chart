import {} from 'react';
import {} from 'antd';
import CodeEditor from '@/components/CodeEditor';
import styles from '../../../index.less';

const StaticConfig = (props: {}) => {
  const {} = props;

  return (
    <CodeEditor
      language="json"
      width={454}
      height={138}
      className={styles['design-config-data-detail-code-view']}
    />
  );
};

export default StaticConfig;
