import { BugOutlined } from '@ant-design/icons';
import { Popover, Button } from 'antd';
import type { ButtonProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import ReactJson from '@/components/JsonView';
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
      <ReactJson src={jsonData}></ReactJson>
    </div>
  );
};

const StepDataButton = (props: {
  buttonProps?: ButtonProps;
  id: string;
  disabled?: boolean;
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { buttonProps = {}, id, disabled } = props;

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!visible) setVisible(true);
    },
    [visible],
  );

  const onVisibleChange = useCallback((visible) => {
    setVisible(visible);
  }, []);

  return (
    <Popover
      trigger={'click'}
      content={<StepData id={id} />}
      mouseEnterDelay={1}
      open={visible}
      onOpenChange={onVisibleChange}
      placement="left"
    >
      <Button
        className="h-a m-r-4"
        type="link"
        icon={<BugOutlined />}
        onClick={handleClick}
        disabled={!!disabled}
        title="debug"
        {...buttonProps}
      />
    </Popover>
  );
};

export default StepDataButton;
