import { useCallback, useMemo, useState } from 'react';
import { Popover, Button } from 'antd';
import type { ButtonProps } from 'antd';
import ReactJson from 'react-json-view';
import { BugOutlined } from '@ant-design/icons';
import { FILTER_STEP_MAP_DATA } from '@/utils/Assist/FilterData';
import styles from './index.less';

const StepData = (props: { id: string }) => {
  const { id } = props;

  const jsonData = useMemo(() => {
    if (!FILTER_STEP_MAP_DATA[id]) return { errMsg: '设计器内部错误' };
    return FILTER_STEP_MAP_DATA[id];
  }, [id]);

  return (
    <div
      className={styles['design-config-data-filter-list-item-step-code']}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <ReactJson
        src={jsonData}
        theme="greenscreen"
        enableClipboard={true}
        onEdit={false}
        onDelete={false}
        onAdd={false}
        displayDataTypes={false}
        displayObjectSize
        indentWidth={2}
        collapseStringsAfterLength={10}
        iconStyle="square"
      />
    </div>
  );
};

const StepDataButton = (props: { buttonProps?: ButtonProps; id: string }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { buttonProps = {}, id } = props;

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    setVisible((prev) => !prev);
  }, []);

  const onVisibleChange = useCallback((visible) => {
    if (!visible) setVisible(visible);
  }, []);

  return (
    <Popover
      trigger={'click'}
      content={<StepData id={id} />}
      mouseEnterDelay={1}
      visible={visible}
      onVisibleChange={onVisibleChange}
      placement="left"
    >
      <Button
        className="h-a m-r-4"
        type="link"
        icon={<BugOutlined />}
        onClick={handleClick}
        {...buttonProps}
      />
    </Popover>
  );
};

export default StepDataButton;
