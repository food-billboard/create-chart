import { useControllableValue, useDebounceEffect } from 'ahooks';
import { Input, Empty } from 'antd';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
import { AutoSizer, Collection } from 'react-virtualized';
import type {
  CollectionCellRenderer,
  CollectionCellSizeAndPositionGetter,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import FocusModal from '@/components/FocusModal';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import { ICON_MAP } from '@/utils/constants/icon';
import styles from './index.less';

const MODAL_WRAPPER_WIDTH = 620;
const MODAL_WIDTH = MODAL_WRAPPER_WIDTH - 24 * 2;
const MODAL_HEIGHT = 450;
const COLUMN_COUNT = 15;
const ICON_ITEM_SIZE = Math.floor(MODAL_WIDTH / COLUMN_COUNT);

const ModalSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, onChange] = useControllableValue(props);
  const [templateSelect, setTemplateSelect] = useState(value);
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [iconList, setIconList] = useState(ICON_MAP);

  const close = () => setVisible(false);

  const onSelectOk = useCallback(() => {
    onChange(templateSelect);
    close();
  }, [templateSelect]);

  const handleSelect = useCallback(() => {
    setTemplateSelect(value);
    setVisible(true);
  }, [value]);

  const onSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const cellRender: CollectionCellRenderer = useCallback(
    ({ index, key, style }) => {
      const iconValue = `bi-${iconList[index]}`;
      return (
        <div
          key={key}
          style={{
            ...style,
            color: iconValue === templateSelect ? DEFAULT_THEME_COLOR : '#fff',
          }}
          className={classnames(styles['icon-modal-select-item'], 'c-po')}
          onClick={() => setTemplateSelect(iconValue)}
        >
          <span className={classnames('bi', iconValue)} />
        </div>
      );
    },
    [iconList, templateSelect],
  );

  const cellSizeAndPositionGetter: CollectionCellSizeAndPositionGetter = ({
    index,
  }) => {
    const height = ICON_ITEM_SIZE;
    const width = ICON_ITEM_SIZE;
    const x = (index % COLUMN_COUNT) * width;
    const y = Math.floor(index / COLUMN_COUNT) * height;

    return {
      height,
      width,
      x,
      y,
    };
  };

  useDebounceEffect(
    () => {
      if (!searchValue) {
        setIconList(ICON_MAP);
      } else {
        setIconList(
          ICON_MAP.filter(
            (item) => item.includes(searchValue) || searchValue.includes(item),
          ),
        );
      }
    },
    [searchValue],
    {
      wait: 500,
    },
  );

  return (
    <>
      <Input
        placeholder="搜索图标"
        className="w-100"
        value={value}
        onClick={handleSelect}
      />
      <FocusModal
        title={
          <div className="dis-flex flex-al-cen">
            图标选择
            <span
              style={{ color: DEFAULT_THEME_COLOR }}
              className={classnames('bi ac-i-size-m m-l-4', templateSelect)}
            />
          </div>
        }
        open={visible}
        onCancel={close}
        onOk={onSelectOk}
        width={MODAL_WRAPPER_WIDTH}
        styles={{
          body: {
            height: MODAL_HEIGHT,
            overflowY: 'auto',
          },
        }}
      >
        <div className={styles['icon-modal-select']}>
          <div className={styles['icon-modal-select-search']}>
            <Input
              placeholder="输入关键字搜索图标"
              allowClear
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
          <div>
            <AutoSizer disableHeight>
              {({ width }) => (
                <Collection
                  cellCount={iconList.length}
                  cellRenderer={cellRender}
                  cellSizeAndPositionGetter={cellSizeAndPositionGetter}
                  className={styles.collection}
                  height={MODAL_HEIGHT - 8 * 2 - 24}
                  noContentRenderer={() => {
                    return (
                      <div className="h-100 dis-flex-cen dis-flex-column">
                        <Empty />
                      </div>
                    );
                  }}
                  width={width}
                  style={{
                    overflowX: 'hidden',
                  }}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      </FocusModal>
    </>
  );
};

export default ModalSelect;
