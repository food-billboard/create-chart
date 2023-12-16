import { RedoOutlined, UndoOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Tooltip } from 'antd';
import { connect } from 'umi';
import DebounceButton from '@/components/DebounceButton';
import GlobalLoadingActonButton from '@/components/GlobalLoadingActionButton';
import { mapDispatchToProps, mapStateToProps } from './connect';

const RedoButton = ({
  visible,
  onClick,
}: {
  onClick: () => void;
  visible: boolean;
}) => {
  return (
    <Tooltip title="重做">
      <DebounceButton
        icon={<RedoOutlined title="重做" />}
        onClick={onClick}
        type={visible ? 'primary' : 'default'}
      />
    </Tooltip>
  );
};
const UndoButton = ({
  visible,
  onClick,
}: {
  onClick: () => void;
  visible: boolean;
}) => {
  return (
    <Tooltip title="撤销">
      <DebounceButton
        icon={<UndoOutlined title="撤销" />}
        onClick={onClick}
        type={visible ? 'primary' : 'default'}
      />
    </Tooltip>
  );
};

export const InternalRedoIcon = (props: {
  isRedoDisabled: boolean;
  redo: () => void;
}) => {
  const { isRedoDisabled, redo } = props;

  const { run: handleClick } = useDebounceFn(
    async () => {
      if (!isRedoDisabled) {
        redo();
      }
    },
    {
      wait: 200,
    },
  );

  return (
    <GlobalLoadingActonButton
      Component={RedoButton}
      title="重做"
      onClick={handleClick}
    />
  );
};
export const RedoIcon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalRedoIcon);

// 撤销
export const InternalUndoIcon = (props: {
  isUndoDisabled: boolean;
  undo: () => void;
}) => {
  const { isUndoDisabled, undo } = props;

  const { run: handleClick } = useDebounceFn(
    async () => {
      if (!isUndoDisabled) {
        undo();
      }
    },
    { wait: 200 },
  );

  return (
    <GlobalLoadingActonButton
      Component={UndoButton}
      title="撤销"
      onClick={handleClick}
    />
  );
};
export const UndoIcon = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalUndoIcon);
