import { PlusOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import classnames from 'classnames';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import GhostButton from '@/components/GhostButton';
import styles from './index.less';

const MultipleSeriesConfig = (props: {
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  counter: number;
  max?: number;
  renderContent: (index: number) => ReactNode;
  buttonLabel?: ReactNode;
  seriesLabel?: (value: number) => ReactNode;
  disabledCal?: boolean;
}) => {
  const {
    onAdd,
    onRemove,
    counter,
    max,
    renderContent,
    buttonLabel,
    seriesLabel,
    disabledCal = false,
  } = props;

  const [activeKey, setActiveKey] = useState<string>('0');

  const onChange = useCallback((activeKey) => {
    setActiveKey(activeKey);
  }, []);

  const add = useCallback(() => {
    setActiveKey(counter.toString());
    onAdd?.();
  }, [onAdd, counter]);

  const remove = useCallback(
    (targetKey) => {
      const index = parseInt(targetKey);
      setActiveKey((index === 0 ? 0 : index - 1).toString());
      onRemove?.(index);
    },
    [onRemove],
  );

  const onEdit = useCallback(
    (targetKey, action) => {
      if (action === 'add') {
        add();
      } else if (action === 'remove') {
        remove(targetKey);
      }
    },
    [add, remove],
  );

  const hideAdd = useMemo(() => {
    if (disabledCal) return true;
    if (typeof max !== 'number') return false;
    return max <= counter;
  }, [max, counter, disabledCal]);

  return (
    <>
      {!hideAdd && (
        <div
          className={classnames('p-8', styles['multiple-series-config-add'])}
        >
          <GhostButton icon={<PlusOutlined />} onClick={add} block>
            {buttonLabel || '新增系列'}
          </GhostButton>
        </div>
      )}
      <Tabs
        type={disabledCal ? 'card' : 'editable-card'}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        hideAdd
        className={styles['multiple-series-config']}
        items={new Array(counter).fill(0).map((_, index) => {
          return {
            label: seriesLabel ? seriesLabel(index) : `系列${index + 1}`,
            key: index.toString(),
            children: renderContent(index),
          };
        })}
      />
    </>
  );
};

export default MultipleSeriesConfig;
