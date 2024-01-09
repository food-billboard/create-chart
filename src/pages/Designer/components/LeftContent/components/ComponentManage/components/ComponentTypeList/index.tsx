import { Tabs } from 'antd';
import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { COMPONENT_TYPE_WIDTH } from '@/utils/constants/another';
import { COMPONENT_TYPE_LIST } from '../../../../../../utils/component';
import ComponentList from '../ComponentList';
import ComponentSearchList from '../ComponentSearch/ComponentSearchList';
import styles from './index.less';

const ComponentTypeList = (props: {
  onChange?: (type: string) => void;
  menuClass?: string;
  onClick?: () => void;
}) => {
  const { onChange, onClick, menuClass } = props;

  const [activeComponentType, setActiveComponentType] = useState<string>(
    COMPONENT_TYPE_LIST[0].type,
  );

  const handleClick = useCallback((value) => {
    setActiveComponentType(value);
    onChange?.(value);
  }, []);

  const list: any = useMemo(() => {
    return COMPONENT_TYPE_LIST.map((item) => {
      const { type, icon, title } = item;
      return {
        key: type,
        label: (
          <div
            className={classnames(
              styles['page-design-left-component-list-item'],
              'dis-flex-column',
            )}
          >
            {icon}
            {title}
          </div>
        ),
        title,
      };
    });
  }, [activeComponentType]);

  return (
    <div className="dis-flex h-100 f-1 over-hide pos-re">
      <div
        className={classnames(
          styles['page-design-left-component-list'],
          'pos-sti normal-background',
          menuClass,
        )}
        style={{
          // @ts-ignore
          '--component-type-width': `${COMPONENT_TYPE_WIDTH}px`,
        }}
      >
        <Tabs
          activeKey={activeComponentType}
          items={list}
          onChange={handleClick}
          onTabClick={onClick}
          tabPosition="right"
          tabBarGutter={4}
        />
      </div>
      <ComponentList type={activeComponentType} />
      <ComponentSearchList />
    </div>
  );
};

export default ComponentTypeList;
