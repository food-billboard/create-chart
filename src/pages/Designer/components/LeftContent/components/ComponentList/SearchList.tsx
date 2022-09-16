import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useDebounceFn } from 'ahooks';
import classnames from 'classnames';
import { Input, Empty, Divider } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { COMPONENT_TYPE_LIST } from '@/utils/constants';
import {
  EVENT_NAME,
  ComponentSearchConfigEventEmitter,
} from '../../../Header/ActionList';
import ComponentItem from './item';
import styles from './index.less';

const findComponentByString = (list: any[]) => {
  const searchResult: any[] = [];
  const find = (list: any[], path: string[]) => {
    list.forEach((item) => {
      const { children, title } = item;
      if (Array.isArray(children)) {
        find(children, [...path, title]);
      } else {
        searchResult.push({
          ...item,
          path,
        });
      }
    });
  };
  find(list, []);
  return searchResult;
};

const FORMAT_COMPONENT_LIST = findComponentByString(COMPONENT_TYPE_LIST);

const ComponentSearch = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    {
      type: string;
      title: string;
      icon: string;
      description: string;
      path: string[];
    }[]
  >([]);
  const searchValue = useRef<string>();

  const findComponentByString = () => {
    setSearchResult(
      FORMAT_COMPONENT_LIST.filter(
        (item) =>
          item.title.includes(searchValue.current) ||
          searchValue.current?.includes(item.title),
      ),
    );
  };

  const { run } = useDebounceFn(
    (value) => {
      searchValue.current = value;
      if (searchValue.current) {
        findComponentByString();
      } else {
        setSearchResult([]);
      }
    },
    {
      wait: 500,
    },
  );

  const onChange = useCallback((e) => {
    const value = e.target.value;
    run(value);
  }, []);

  const onVisibleChange = () => {
    setVisible((prev) => {
      return !prev;
    });
  };

  const searchListDom = useMemo(() => {
    if (!searchResult.length) return null;
    return searchResult.map((item) => {
      return (
        <ComponentItem
          key={item.type}
          {...(item as any)}
          tooltip={false}
          prefix={
            <Divider
              orientation="left"
              orientationMargin={16}
              plain
              className={styles['component-search-list-item-path']}
            >
              {item.path.join(' / ')}
            </Divider>
          }
        />
      );
    });
  }, [searchResult]);

  useEffect(() => {
    ComponentSearchConfigEventEmitter.addListener(
      EVENT_NAME.COMPONENT_SEARCH_VISIBLE,
      onVisibleChange,
    );
    return () => {
      ComponentSearchConfigEventEmitter.removeListener(
        EVENT_NAME.COMPONENT_SEARCH_VISIBLE,
      );
    };
  }, []);

  return (
    <div
      className={classnames(styles['component-search-list'], {
        [styles['component-search-list-visible']]: visible,
      })}
    >
      <CloseOutlined
        onClick={onVisibleChange}
        className={styles['component-search-list-close']}
      />
      <Input
        placeholder="请输入搜索文字"
        prefix={<SearchOutlined />}
        onChange={onChange}
      />
      {!searchResult.length && !!searchValue.current && (
        <Empty
          description="暂无组件"
          className={classnames(
            styles['component-search-list-empty'],
            'border-r-8',
            'normal-background',
          )}
        />
      )}
      <div
        className={classnames(
          styles['component-search-list-content'],
          'zero-scrollbar',
        )}
      >
        {searchListDom}
      </div>
    </div>
  );
};

export default ComponentSearch;
