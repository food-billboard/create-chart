import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useMemo,
} from 'react';
import { Modal, Input, Row, Col } from 'antd';
import { useDebounce } from 'ahooks';
import classnames from 'classnames';
import ColorSelect from '@/components/ColorSelect';
import { COMPONENT_ONLY_TYPE_LIST } from '@/utils/constants/component';
import ThemeUtil from '@/utils/Assist/Theme';
import FocusWrapper from '../FocusWrapper';
import styles from './index.less';

const { Search } = Input;
const { getRgbaString } = ColorSelect;

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

  const open = (select?: string) => {
    if (visible) return;
    setVisible(true);
    setSelect(select || '');
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
    return COMPONENT_ONLY_TYPE_LIST.filter((item) => {
      const { type, description, title } = item;
      const dataList = [type, description, title].filter(
        (item) => !!item.length,
      );
      return (
        (filter ? filter(item) : true) &&
        dataList.some((item) => isIncludes(item, debouncedSearchValue))
      );
    });
  }, [filter, debouncedSearchValue, isIncludes]);

  const handleOk = useCallback(() => {
    onChange?.(
      select,
      select ? filterComponentList.find((item) => item.type === select) : {},
    );
    setVisible(false);
  }, [onChange, select, filterComponentList]);

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
                    borderColor: getRgbaString(
                      ThemeUtil.generateNextColor4CurrentTheme(0),
                    ),
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
      visible={visible}
      bodyStyle={{
        height: 500,
        overflowY: 'auto',
      }}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={handleOk}
      title="组件切换"
    >
      <FocusWrapper force={visible}>
        <Search
          value={searchValue}
          onChange={(value) => setSearchValue(value.target.value)}
          className="w-100 m-b-24"
        />
        <div className={styles['component-select']}>
          <Row gutter={24}>{componentList}</Row>
        </div>
      </FocusWrapper>
    </Modal>
  );
});

export default ComponentSelect;
