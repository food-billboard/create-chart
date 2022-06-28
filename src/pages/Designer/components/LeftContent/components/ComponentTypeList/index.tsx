import { useCallback, useMemo, useState } from 'react';
import { Menu } from 'antd';
import classnames from 'classnames';
import ComponentList from '../ComponentList';
import { COMPONENT_TYPE_LIST } from '@/utils/constants';
import styles from './index.less';

const ComponentTypeList = (props: {
  onChange?: (type: string) => void;
  menuClass?: string;
}) => {
  const { onChange, menuClass } = props;

  const [activeComponentType, setActiveComponentType] = useState<string>(
    COMPONENT_TYPE_LIST[0].type,
  );

  const handleClick = useCallback((value) => {
    const key = value.key;
    setActiveComponentType(key);
    onChange?.(key);
  }, []);

  const list: any = useMemo(() => {
    return COMPONENT_TYPE_LIST.map((item) => {
      const { type, icon, title } = item;
      return {
        key: type,
        label: icon,
        title,
      };
    });
  }, [activeComponentType]);

  return (
    <>
      <div
        className={classnames(
          styles['page-design-left-component-list'],
          'pos-sti',
        )}
      >
        <Menu
          theme="dark"
          mode="vertical"
          onClick={handleClick}
          className={classnames(
            styles['page-design-left-component-list-content'],
            'zero-scrollbar',
            menuClass,
          )}
          selectedKeys={[activeComponentType]}
          items={list}
        />
      </div>
      <ComponentList type={activeComponentType} />
    </>
  );
};

export default ComponentTypeList;
