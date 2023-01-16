import { useCallback, useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Button, Space } from 'antd';
import { useInViewport, useDebounceFn } from 'ahooks';
import { isNil } from 'lodash';
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import Tooltip from '@/components/Tooltip';
import { COMPONENT_ICON_MAP } from '../../../../../../../../utils/component';
import styles from './index.less';

const ComponentList = (props: {
  components: ComponentData.TComponentData[];
  current: number;
  onChange?: (current: number) => void;
}) => {
  const { components, current, onChange } = props;

  const [loaded, setLoaded] = useState(false);

  const leftPrefixRef = useRef(null);
  const rightPrefixRef = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [isLeftInViewport] = useInViewport(leftPrefixRef);
  const [isRightInViewport] = useInViewport(rightPrefixRef);

  const { run: handleLeftClick } = useDebounceFn(
    () => {
      listRef.current?.scrollBy(-238, 0);
    },
    {
      leading: true,
    },
  );

  const { run: handleRightClick } = useDebounceFn(
    () => {
      listRef.current?.scrollBy(238, 0);
    },
    {
      leading: true,
    },
  );

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <div
      className={classnames(
        styles['group-carousel-component-list-wrapper'],
        'pos-re',
      )}
    >
      <div
        ref={listRef}
        className={classnames(
          'zero-scrollbar',
          styles['group-carousel-component-list'],
        )}
      >
        <div
          className={classnames(
            'dis-flex',
            styles['group-carousel-component-list-btn'],
            styles['group-carousel-component-list-btn-left'],
            {
              [styles['group-carousel-component-list-btn-visible']]:
                loaded && !isNil(isLeftInViewport) && !isLeftInViewport,
            },
          )}
        >
          <Button
            type="link"
            icon={<LeftSquareOutlined />}
            onClick={handleLeftClick}
          />
        </div>
        <span ref={leftPrefixRef}></span>
        <Space>
          {components.map((component, index) => {
            const { name, componentType, id } = component;
            return (
              <Tooltip title={name} key={id}>
                <div
                  className={classnames(
                    styles['group-carousel-component-list-item'],
                    {
                      [styles['group-carousel-component-list-item-active']]:
                        index === current,
                    },
                  )}
                  onClick={onChange?.bind(null, index)}
                >
                  <img
                    className="w-100 h-100"
                    src={COMPONENT_ICON_MAP[componentType]}
                  />
                </div>
              </Tooltip>
            );
          })}
        </Space>
        <span ref={rightPrefixRef}></span>
        <div
          className={classnames(
            'dis-flex',
            styles['group-carousel-component-list-btn'],
            styles['group-carousel-component-list-btn-right'],
            {
              [styles['group-carousel-component-list-btn-visible']]:
                loaded && !isNil(isRightInViewport) && !isRightInViewport,
            },
          )}
        >
          <Button
            icon={<RightSquareOutlined />}
            type="link"
            onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentList;
