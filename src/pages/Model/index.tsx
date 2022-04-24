import { useState, useCallback, useEffect, useRef } from 'react';
import { Pagination, Input, Button, Empty } from 'antd';
import classnames from 'classnames';
import { getScreenModelList } from '@/services';
import { goDesign } from '@/utils/tool';
import List from './components/List';
import styles from './index.less';

const { Search } = Input;

function ScreenModelList() {
  const [currPage, setCurrPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>('');
  const [list, setList] = useState<API_SCREEN.TGetScreenListData[]>([]);

  const fetchLoading = useRef<boolean>(false);

  const onPageChange = useCallback((page) => {
    setCurrPage(page);
  }, []);

  const fetchData = async (
    params: Partial<{
      currPage: number;
      content: string;
    }>,
  ) => {
    if (fetchLoading.current) return;
    fetchLoading.current = true;

    const { currPage: paramsCurrentPage, content: paramsContent } = params;

    try {
      const res = await getScreenModelList({
        currPage: ((paramsCurrentPage ?? currPage) || 1) - 1,
        content: paramsContent ?? searchData,
      });
      const { total, list } = res.data.res;
      setTotal(total);
      setList(list);
    } catch (err) {
    } finally {
      fetchLoading.current = false;
    }
  };

  const onChange = useCallback(() => {
    fetchData({
      currPage,
    });
  }, [currPage]);

  const handleAdd = useCallback(() => {
    goDesign();
  }, []);

  useEffect(() => {
    fetchData({
      currPage,
    });
  }, [currPage]);

  useEffect(() => {
    const event = (e: any) => {
      const isHidden = e.target.webkitHidden;
      if (!isHidden) {
        fetchData({});
      }
    };
    document.addEventListener('visibilitychange', event);
    return () => {
      document.removeEventListener('visibilitychange', event);
    };
  }, []);

  return (
    <>
      <div
        className={classnames(
          styles['screen-page-content-main-model-header'],
          'animate__fadeInDown',
          'animate__animated',
          'animate__delay-1s',
        )}
      >
        自己做的数据可视化大屏模板
      </div>
      <div
        className={classnames(
          styles['screen-page-content-main-model-action'],
          'm-tb-16',
          'dis-flex',
        )}
      >
        <Search
          value={searchData}
          onChange={(e) => {
            setSearchData(e.target.value);
          }}
          onSearch={fetchData.bind(null, {
            currPage,
            content: searchData,
          })}
        />
        <div>
          <Button type="primary" onClick={handleAdd}>
            新建
          </Button>
        </div>
      </div>
      <div className={styles['screen-page-content-main-model-list']}>
        {list.length ? <List value={list} onChange={onChange} /> : <Empty />}
      </div>
      <div className={styles['screen-page-content-main-model-pagination']}>
        <Pagination current={currPage} onChange={onPageChange} total={total} />
      </div>
    </>
  );
}

export default ScreenModelList;
