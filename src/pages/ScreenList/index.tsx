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
import classnames from 'classnames';
import { history } from 'umi';
import { getScreenList } from '@/services';
import List from './components/ScreenList';
import styles from './index.less';

const { Search } = Input;
const { Header, Content, Footer } = Layout;

function ScreenList() {
  const [currPage, setCurrPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>('');
  const [list, setList] = useState<API_SCREEN.TGetScreenListData[]>([]);

  const fetchLoading = useRef<boolean>(true);

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

    const { currPage, content } = params;

    try {
      const { total, list } = await getScreenList({
        currPage,
        content,
      });
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
    history.push({
      pathname: '/designer',
    });
  }, []);

  useEffect(() => {
    fetchData({
      currPage,
    });
  }, [currPage]);

  return (
    <Layout className={styles['screen-page']}>
      <Header>
        <div className={styles['screen-page-logo']} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key={'home'}>首页</Menu.Item>
        </Menu>
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
          <div className={styles['screen-page-content-main-header']}>
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
            {!list.length ? (
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
