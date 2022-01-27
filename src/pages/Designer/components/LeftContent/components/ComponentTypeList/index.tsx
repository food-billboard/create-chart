import { useCallback, useMemo, useState } from 'react';
import { Menu } from 'antd';
import classnames from 'classnames';
import ComponentList from '../ComponentList';
import { COMPONENT_TYPE_LIST } from '@/utils/constants';
import styles from './index.less';

const ComponentTypeList = (props: { onChange?: (type: string) => void }) => {
  const { onChange } = props;

  const [activeComponentType, setActiveComponentType] = useState<string>(
    COMPONENT_TYPE_LIST[0].type,
  );

  const handleClick = useCallback((value) => {
    const key = value.key;
    setActiveComponentType(key);
    onChange?.(key);
  }, []);

  const list = useMemo(() => {
    return COMPONENT_TYPE_LIST.map((item) => {
      const { type, icon, title } = item;
      return (
        <Menu.Item
          key={type}
          className={classnames(
            styles['page-design-left-component-list-item'],
            'p-lr-8',
            'c-po',
            'ali-cen',
          )}
          title={title}
        >
          {icon}
        </Menu.Item>
      );
    });
  }, [activeComponentType]);

  return (
    <>
      <div className={styles['page-design-left-component-list']}>
        <Menu
          theme="dark"
          mode="vertical"
          onClick={handleClick}
          className={styles['page-design-left-component-list-content']}
          selectedKeys={[activeComponentType]}
        >
          {list}
        </Menu>
      </div>
      <ComponentList type={activeComponentType} />
    </>
  );
};

export default ComponentTypeList;
