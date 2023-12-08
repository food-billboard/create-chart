import { FileImageOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Modal, Pagination, Flex } from 'antd';
import classnames from 'classnames';
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getInternalBackgroundList } from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import BackgroundMap from './components/Background';
import styles from './index.less';

export { default as BackgroundMap } from './components/Background';

const LOCAL_BACKGROUND_LIST = Object.entries(BackgroundMap);

export const BackgroundRender = ({
  value,
  style,
  className,
  onClick,
  thumb = false,
  children,
}: {
  value: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  thumb?: boolean;
  children?: ReactNode;
}) => {
  const { value: realValue, isInternal } = useMemo<{
    value: string | ReactNode;
    isInternal: boolean;
  }>(() => {
    const noPrefixValue = (value || '').replace('internal_background-', '');
    if (noPrefixValue.startsWith('http')) {
      return {
        value: noPrefixValue,
        isInternal: false,
      };
    } else {
      return {
        value:
          (BackgroundMap as any)[noPrefixValue]?.[thumb ? 'image' : 'value'] ||
          ('' as string | ReactNode),
        isInternal: !thumb,
      };
    }
  }, [value, thumb]);

  return (
    <div
      style={style}
      className={classnames(className, styles['internal-background-render'])}
      onClick={onClick}
    >
      {isInternal ? (
        realValue
      ) : (
        <img
          src={realValue as string}
          className={styles['internal-background-render-image']}
        />
      )}
      {children}
    </div>
  );
};

type BackgroundData = {
  label: string;
  value: string;
  image: string | ReactNode;
};

export const InternalBackgroundSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const pageSize = 10;

  const [value, onChange] = useControllableValue(props);

  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [improveDataSource, setImproveDataSource] = useState<BackgroundData[]>(
    [],
  );
  const [total, setTotal] = useState(
    GlobalConfig.IS_IMPROVE_BACKEND ? 0 : LOCAL_BACKGROUND_LIST.length,
  );

  const handleSelect = useCallback(() => {
    setVisible(true);
    setCurrentPage(1);
  }, []);

  const handleSelectConfirm = useCallback(
    (value) => {
      onChange(value);
      setVisible(false);
    },
    [onChange],
  );

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
    return GlobalConfig.IS_IMPROVE_BACKEND
      ? improveDataSource
      : normalDataSource;
  }, [normalDataSource, improveDataSource]);

  // improve 获取数据
  const fetchData = useCallback(async ({ current }: { current: number }) => {
    if (!GlobalConfig.IS_IMPROVE_BACKEND) return;
    const data: any = await getInternalBackgroundList({ current, pageSize });
    setImproveDataSource(data.list as BackgroundData[]);
    setTotal(data.total);
  }, []);

  const onPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    fetchData({ current: currentPage });
  }, [currentPage]);

  return (
    <>
      <BackgroundRender
        value={value || ''}
        onClick={handleSelect}
        thumb
        className={styles['internal-background-button']}
      >
        <div className={styles['internal-background-button-mask']}>
          <FileImageOutlined />
          <div style={{ marginTop: 8 }}>点击这里进行更改</div>
        </div>
      </BackgroundRender>
      <Modal
        title="背景选择"
        open={visible}
        footer={null}
        onCancel={setVisible.bind(null, false)}
        zIndex={1071}
      >
        <div className={styles['internal-background-modal-list']}>
          <Flex wrap="wrap" gap={'middle'}>
            {dataSource.map((item) => {
              const { label, value } = item;
              return (
                <div
                  key={value}
                  className={styles['internal-background-modal-list-item']}
                >
                  <BackgroundRender
                    onClick={handleSelectConfirm.bind(null, value)}
                    value={value}
                    className={
                      styles['internal-background-modal-list-item-main']
                    }
                    thumb
                  />
                  <div
                    className={
                      styles['internal-background-modal-list-item-label']
                    }
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </Flex>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={onPageChange}
            hideOnSinglePage
          />
        </div>
      </Modal>
    </>
  );
};
