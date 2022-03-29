import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Pagination,
  Input,
  Button,
  Empty,
} from 'antd';
import { useUpdateEffect } from 'ahooks';
import classnames from 'classnames';
import { getScreenList } from '@/services';
import { goDesign } from '@/utils/tool';
import Avatar from './components/Avatar';
import List from './components/ScreenList';
import styles from './index.less';

const { Search } = Input;
const { Header, Content, Footer } = Layout;

function ScreenList() {
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
      const res = await getScreenList({
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
    <Layout className={styles['screen-page']}>
      <Header>
        <div className={styles['screen-page-logo']} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key={'home'}>首页</Menu.Item>
        </Menu>
        <div className={styles['screen-page-avatar']}>
          <Avatar />
        </div>
      </Header>
      <Content
        className={styles['screen-page-content']}
        style={{ padding: '0 50px' }}
      >
        <Breadcrumb style={{ margin: '16px 0', visibility: 'hidden' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className={classnames(
            styles['screen-page-content-main'],
            'border-r-16',
          )}
        >
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
          <div className={styles['screen-page-content-main-list']}>
            {list.length ? (
              <List value={list} onChange={onChange} />
            ) : (
              <Empty />
            )}
          </div>
          <div className={styles['screen-page-content-main-pagination']}>
            <Pagination
              current={currPage}
              onChange={onPageChange}
              total={total}
            />
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Daniel Screen ©2022</Footer>
    </Layout>
  );
}

export default ScreenList;
