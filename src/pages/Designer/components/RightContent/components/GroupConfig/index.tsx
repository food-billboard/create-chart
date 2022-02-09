import { Select, Tabs } from 'antd';
import classnames from 'classnames';
import ConfigWrapper, { ConfigItem } from '../Common/ConfigWrapper';
import BaseConfig from '../Common/BaseConfig';
import styles from './index.less';

const GroupConfig = (props: { id: string }) => {
  const { id } = props;

  return (
    <div className={classnames('h-100', styles['design-config-group'])}>
      <ConfigWrapper tabCounter={1}>
        <ConfigItem tab="组合配置" key="1">
          <BaseConfig id={id} />
        </ConfigItem>
      </ConfigWrapper>
    </div>
  );
};

export default GroupConfig;
