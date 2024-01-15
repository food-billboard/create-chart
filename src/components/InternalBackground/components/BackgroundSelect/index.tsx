import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Pagination, Row, Col, Tabs, App } from 'antd';
import type { ModalProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import classnames from 'classnames';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from 'react';
import Modal from '@/components/FocusModal';
import { ContentLoading } from '@/components/PageLoading';
import {
  getMediaList,
  getMediaClassicList,
  deleteClassic,
  addClassic,
  updateClassic,
  addMediaData,
  deleteMediaData,
} from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import ImageUpload from '../../../ImageUpload';
import BackgroundMap from '../Background';
import BackgroundRender from '../BackgroundRender';
import AddClassic, { AddClassicRef } from './components/AddClassic';
import styles from './index.less';

const LOCAL_BACKGROUND_LIST = Object.entries(BackgroundMap);

export type BackgroundData = {
  label: string;
  value: string;
  image: string | ReactNode;
  classic: string;
};

export type BackgroundSelectRef = {
  open: () => void;
};

export type BackgroundSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  mode: 'select' | 'editable';
  modalProps?: ModalProps;
  visibleType?: 'modal' | 'page';
  style?: CSSProperties;
  className?: string;
};

const BackgroundSelect = forwardRef<BackgroundSelectRef, BackgroundSelectProps>(
  (props, ref) => {
    const { mode, modalProps, visibleType = 'modal', style, className } = props;

    const { modal } = App.useApp();

    const [_, onChange] = useControllableValue(props);

    const [fetchLoading, setFetchLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentClassic, setCurrentClassic] = useState('');
    const [improveDataSource, setImproveDataSource] = useState<
      BackgroundData[]
    >([]);
    const [improveClassicDataSource, setImproveClassicDataSource] = useState<
      API_IMPROVE.MediaClassicData[]
    >([]);
    const [total, setTotal] = useState(
      GlobalConfig.IS_IMPROVE_BACKEND ? 0 : LOCAL_BACKGROUND_LIST.length,
    );

    const addClassicRef = useRef<AddClassicRef>(null);

    const pageSize = useRef(12);

    const handleSelectConfirm = useCallback(
      (value) => {
        if (mode !== 'select') return;
        onChange(value);
        setVisible(false);
      },
      [onChange, mode],
    );

    const classicItems = useMemo(() => {
      return [
        {
          label: '全部',
          key: '',
          closable: false,
        },
        ...improveClassicDataSource.map((item) => {
          return {
            label: (
              <>
                {item.label}
                {mode === 'editable' && (
                  <EditOutlined
                    className="m-l-4"
                    onClick={() =>
                      addClassicRef.current?.open({
                        label: item.label,
                        value: item.value,
                      })
                    }
                  />
                )}
              </>
            ),
            key: item.value,
            closable: true,
            closeIcon: <DeleteOutlined />,
          };
        }),
      ];
    }, [improveClassicDataSource]);

    // 普通大屏获取获取
    const normalDataSource = useMemo(() => {
      return LOCAL_BACKGROUND_LIST.slice(
        (currentPage - 1) * 10,
        currentPage * 10,
      ).map((item) => {
        const [key, { title, value }] = item;
        return {
          label: title,
          value: key,
          image: value,
        };
      });
    }, [currentPage]);

    const dataSource = useMemo(() => {
      return GlobalConfig.IS_IMPROVE_BACKEND || mode === 'editable'
        ? improveDataSource
        : normalDataSource;
    }, [normalDataSource, improveDataSource]);

    const tabBarExtraContent = useMemo(() => {
      if (mode === 'select') return null;
      return <></>;
    }, [mode]);

    // improve 获取数据
    const fetchData = useCallback(
      async ({ current, classic }: { current: number; classic: string }) => {
        if (!GlobalConfig.IS_IMPROVE_BACKEND) return;
        setFetchLoading(true);
        const data: any = await getMediaList({
          current,
          pageSize: pageSize.current,
          classic,
        });
        setImproveDataSource(data.list as BackgroundData[]);
        setTotal(data.total);
        setFetchLoading(false);
      },
      [],
    );

    // 分类删除
    const handleDeleteClassic = useCallback(
      async (targetKey) => {
        await deleteClassic(targetKey);
        const index = improveClassicDataSource.findIndex(
          (item) => item.value === targetKey,
        );
        let nextClassic = currentClassic;
        // 相同则切换至最近一个
        if (targetKey === currentClassic) {
          if (!index) {
            nextClassic = '';
          } else {
            nextClassic = improveClassicDataSource[index - 1].value;
          }
          setCurrentPage(1);
        }
        improveClassicDataSource.splice(index, 1);
        setImproveClassicDataSource([...improveClassicDataSource]);
        setCurrentClassic(nextClassic);
      },
      [improveClassicDataSource, currentClassic],
    );

    // 新增或者修改分类
    const handleAddClassic = useCallback(async ({ label, value }) => {
      try {
        let result: any;
        if (value) {
          result = await updateClassic({ label, value });
        } else {
          result = await addClassic({ label });
        }
        getMediaClassicList();
        setCurrentPage(1);
        setCurrentClassic((result as string) || value);
        // TODO 根据是否返回了分类的id来判断是否成功或失败
        return true;
      } catch (err) {
        return false;
      }
    }, []);

    // 分类切换
    const onTabChange = useCallback((currentClassic) => {
      setCurrentClassic(currentClassic);
      setCurrentPage(1);
    }, []);

    // 分类的新增和删除
    const onTabEdit = useCallback(
      (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
      ) => {
        if (action === 'add') {
          addClassicRef.current?.open();
        } else {
          modal.confirm({
            title: '提示',
            content: '删除分类同时会删除分类下的媒体资源，确认删除？',
            onOk: () => handleDeleteClassic(targetKey),
          });
        }
      },
      [handleDeleteClassic],
    );

    const onPageChange = useCallback((page) => {
      setCurrentPage(page);
    }, []);

    // 编辑模式下的图片删除
    const onDeleteBackground = useCallback(async ({ value, classic }) => {
      await deleteMediaData({ value, classic });
      setCurrentPage(1);
    }, []);

    // 图片上传完成
    const onBackgroundChange = useCallback(
      async (fileList: UploadFile<any>[]) => {
        const [target] = fileList;
        if (target?.status === 'done') {
          const fileUrl = target.url as string;
          await addMediaData({ classic: currentClassic, value: fileUrl });
          setCurrentPage(1);
        }
      },
      [currentClassic],
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => {
            setVisible(true);
            setCurrentClassic('');
            setCurrentPage(1);
          },
        };
      },
      [],
    );

    useEffect(() => {
      fetchData({ current: currentPage, classic: currentClassic });
    }, [currentPage, currentClassic]);

    useEffect(() => {
      if (!GlobalConfig.IS_IMPROVE_BACKEND) return;
      getMediaClassicList().then((data) => {
        // TODO
        setImproveClassicDataSource([]);
      });
    }, []);

    useEffect(() => {
      pageSize.current =
        GlobalConfig.IS_IMPROVE_BACKEND && mode === 'editable' && currentClassic
          ? 11
          : 12;
    }, [mode, currentClassic]);

    const children = (
      <div
        className={classnames(
          styles['internal-background-modal-list'],
          'pos-re',
          className,
        )}
        style={style}
      >
        <Tabs
          type={mode === 'editable' ? 'editable-card' : 'line'}
          onEdit={onTabEdit}
          items={classicItems}
          onChange={onTabChange}
          tabBarExtraContent={tabBarExtraContent}
        />
        <Row gutter={24}>
          {GlobalConfig.IS_IMPROVE_BACKEND ||
            (mode === 'editable' && (
              <Col span={6}>
                <ImageUpload
                  defaultFileList={[]}
                  onChange={onBackgroundChange}
                  inputVisible={false}
                  height={'80px'}
                />
              </Col>
            ))}
          {dataSource.map((item) => {
            const { label, value } = item;
            return (
              <Col
                span={6}
                key={value}
                className={styles['internal-background-modal-list-item']}
              >
                <BackgroundRender
                  onClick={handleSelectConfirm.bind(null, value)}
                  value={value}
                  className={styles['internal-background-modal-list-item-main']}
                  thumb
                  editable={
                    mode === 'editable' && {
                      onDelete: onDeleteBackground.bind(null, item),
                    }
                  }
                />
                <div
                  className={
                    styles['internal-background-modal-list-item-label']
                  }
                >
                  {label}
                </div>
              </Col>
            );
          })}
        </Row>
        <Pagination
          total={total}
          pageSize={pageSize.current}
          current={currentPage}
          onChange={onPageChange}
          hideOnSinglePage
        />
        <ContentLoading loading={fetchLoading} />
      </div>
    );

    return (
      <>
        {visibleType === 'modal' ? (
          <Modal
            title="背景选择"
            open={visible}
            footer={null}
            onCancel={setVisible.bind(null, false)}
            zIndex={1071}
            {...modalProps}
          >
            {children}
          </Modal>
        ) : (
          <>{children}</>
        )}
        <AddClassic ref={addClassicRef} onConfirm={handleAddClassic} />
      </>
    );
  },
);

export default BackgroundSelect;
