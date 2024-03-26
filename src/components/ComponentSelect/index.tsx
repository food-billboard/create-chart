import { useDebounce } from 'ahooks';
import { Col, Input, Row } from 'antd';
import classnames from 'classnames';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import Modal from '@/components/FocusModal';
import { Loading } from '../PageLoading';
import styles from './index.less';

const { Search } = Input;

export type ComponentSelectRef = {
  open: (select?: string) => void;
};

const ComponentSelect = forwardRef<
  ComponentSelectRef,
  {
    onChange?: (type: string, info: any) => void;
    filter?: (value: any) => boolean;
  }
>((props, ref) => {
  const { onChange, filter } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [select, setSelect] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [componentOnlyTypeList, setComponentOnlyTypeList] = useState<
    {
      type: string;
      title: string;
      description: string;
      icon: string;
    }[]
  >([]);

  const open = async (select?: string) => {
    if (visible) return;
    setVisible(true);
    setLoading(true);
    setSelect(select || '');
    if (!componentOnlyTypeList.length) {
      import('@/pages/Designer/utils/component').then((data) => {
        setComponentOnlyTypeList(data.COMPONENT_ONLY_TYPE_LIST);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, { wait: 500 });

  const handleSelect = useCallback((value) => {
    setSelect(value);
  }, []);

  const isIncludes = useCallback((origin: string, target: string) => {
    const lowerOrigin = origin.toLowerCase();
    const lowerTarget = target.toLowerCase();
    return (
      lowerOrigin.includes(lowerTarget) || lowerTarget.includes(lowerOrigin)
    );
  }, []);

  const filterComponentList = useMemo(() => {
    return componentOnlyTypeList.filter((item) => {
      const { type, description, title } = item;
      const dataList = [type, description, title].filter(
        (item) => !!item.length,
      );
      return (
        (filter ? filter(item) : true) &&
        dataList.some((item) => isIncludes(item, debouncedSearchValue))
      );
    });
  }, [filter, debouncedSearchValue, isIncludes, componentOnlyTypeList]);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const handleOk = useCallback(() => {
    onChange?.(
      select,
      select ? filterComponentList.find((item) => item.type === select) : {},
    );
    close();
  }, [onChange, select, filterComponentList, close]);

  const componentList = useMemo(() => {
    return filterComponentList.map((item) => {
      const { title, description, icon, type } = item;
      const isSelect = select === type;
      return (
        <Col span={8} key={type} className="m-b-8">
          <div
            className={classnames(
              'w-100',
              'ali-cen',
              'c-po',
              'p-4',
              'border-1',
              styles['component-select-item'],
              {
                [styles['component-select-item-active']]: isSelect,
              },
            )}
            style={
              isSelect
                ? {
                    borderColor: 'var(--primary-color)',
                  }
                : {}
            }
            onClick={handleSelect.bind(null, isSelect ? '' : type)}
          >
            <img src={icon} title={title} className="w-100" />
            <span>{title}</span>
          </div>
        </Col>
      );
    });
  }, [select, filterComponentList]);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  return (
    <Modal
      open={visible}
      styles={{
        body: {
          height: 500,
          overflowY: 'auto',
        },
      }}
      onCancel={close}
      onOk={handleOk}
      title="组件切换"
    >
      <div className="pos-re w-100 h-100">
        {!loading && (
          <>
            <Search
              value={searchValue}
              onChange={(value) => setSearchValue(value.target.value)}
              className="w-100 m-b-24"
            />
            <div className={styles['component-select']}>
              <Row gutter={24}>{componentList}</Row>
            </div>
          </>
        )}
        {loading && (
          <div className={styles['component-select-loading']}>
            <Loading size={25} />
          </div>
        )}
      </div>
    </Modal>
  );
});

export default ComponentSelect;
