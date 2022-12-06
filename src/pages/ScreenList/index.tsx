import { useState, useCallback, useEffect, useRef } from 'react';
import { Pagination, Input, Button, Empty, Space, Select } from 'antd';
import classnames from 'classnames';
import { getScreenList } from '@/services';
import { LeadIn } from '@/utils/Assist/LeadInAndOutput';
import SvgAnimation from './components/SvgAnimation';
import List from './components/ScreenList';
import AddDesigner from './components/AddDesigner';
import styles from './index.less';

const { Search } = Input;

function ScreenList() {
  const [currPage, setCurrPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>('');
  const [searchType, setSearchType] = useState<
    ComponentData.ScreenFlagType | ''
  >('');
  const [list, setList] = useState<API_SCREEN.TGetScreenListData[]>([]);

  const fetchLoading = useRef<boolean>(false);

  const onPageChange = useCallback((page) => {
    setCurrPage(page);
  }, []);

  const fetchData = async (
    params: Partial<{
      currPage: number;
      content: string;
      flag: typeof searchType;
    }> = {},
  ) => {
    if (fetchLoading.current) return;
    fetchLoading.current = true;

    const {
      currPage: paramsCurrentPage,
      content: paramsContent,
      flag: paramsFlag,
    } = params;

    try {
      const res = await getScreenList({
        currPage: ((paramsCurrentPage ?? currPage) || 1) - 1,
        content: paramsContent ?? searchData,
        flag: paramsFlag ?? searchType,
      });
      const { total, list } = res.data.res;
      setTotal(total);
      setList(list);
    } catch (err) {
    } finally {
      fetchLoading.current = false;
    }
  };

  const handleReset = useCallback(() => {
    setSearchData('');
    setSearchType('');
    fetchData({
      currPage: 0,
      content: '',
      flag: '',
    });
  }, []);

  const onChange = useCallback(async () => {
    await fetchData({
      currPage,
    });
  }, [currPage]);

  const handleLeadIn = useCallback(async () => {
    LeadIn('screen', fetchData.bind(null, {}));
  }, []);

  const onVisibilityChange = useCallback(
    (e: any) => {
      const isHidden = e.target.webkitHidden;
      if (!isHidden) {
        fetchData({});
      }
    },
    [searchData, searchType, currPage],
  );

  useEffect(() => {
    fetchData({
      currPage,
    });
  }, [currPage]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return (
    <>
      <SvgAnimation />
      <div
        className={classnames(
          styles['screen-page-content-main-header'],
          'animate__fadeInDown',
          'animate__animated',
          'animate__delay-1s',
        )}
      >
        自己做的数据可视化大屏
      </div>
      <div
        className={classnames(
          styles['screen-page-content-main-action'],
          'm-tb-16',
          'dis-flex',
        )}
      >
        <Space>
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
          <Select
            value={searchType}
            onChange={setSearchType}
            style={{ width: 200 }}
            options={[
              {
                label: '全部',
                value: '',
              },
              {
                label: 'PC端',
                value: 'PC',
              },
              {
                label: '移动端',
                value: 'H5',
              },
            ]}
          />
          <Button type="primary" onClick={fetchData.bind(null, {})}>
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
        <div>
          <Space>
            <Button type="primary" onClick={handleLeadIn}>
              导入
            </Button>
            <AddDesigner type="screen" />
          </Space>
        </div>
      </div>
      <div className={styles['screen-page-content-main-list']}>
        {list.length ? <List value={list} onChange={onChange} /> : <Empty />}
      </div>
      <div className={styles['screen-page-content-main-pagination']}>
        <Pagination current={currPage} onChange={onPageChange} total={total} />
      </div>
    </>
  );
}

export default ScreenList;
