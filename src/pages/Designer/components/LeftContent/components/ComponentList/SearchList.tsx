import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Input, Empty, Divider, Button } from 'antd';
import classnames from 'classnames';
import { useState, useCallback, useMemo, useRef } from 'react';
import { connect } from 'umi';
import { ConnectState, ILocalModelState } from '@/models/connect';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import { COMPONENT_TYPE_LIST } from '../../../../utils/component';
import styles from './index.less';
import ComponentItem from './item';

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

const ComponentSearch = (props: {
  componentCollapse: boolean;
  setLocalConfig: (value: Partial<ILocalModelState>) => void;
}) => {
  const { componentCollapse, setLocalConfig } = props;

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
    setLocalConfig({
      componentCollapse: !componentCollapse,
    });
    GLOBAL_EVENT_EMITTER.emit(
      EVENT_NAME_MAP.COMPONENT_SEARCH_VISIBLE,
      !componentCollapse,
    );
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

  return (
    <div
      className={classnames(styles['component-search-list'], {
        [styles['component-search-list-visible']]: componentCollapse,
      })}
    >
      <Button
        icon={<CloseOutlined />}
        onClick={onVisibleChange}
        className={styles['component-search-list-close']}
        type="text"
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

export default connect(
  (state: ConnectState) => {
    return {
      componentCollapse: state.local.componentCollapse,
    };
  },
  (dispatch: any) => ({
    setLocalConfig: (value: any) =>
      dispatch({ type: 'local/setLocalConfig', value }),
  }),
)(ComponentSearch);
