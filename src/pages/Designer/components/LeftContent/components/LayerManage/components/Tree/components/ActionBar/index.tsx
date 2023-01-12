import { useMemo } from 'react';
import { pick, noop } from 'lodash';
import { connect } from 'dva';
import { Space } from 'antd';
import {
  BottomAction,
  TopAction,
  LockAction,
  DeleteAction,
  ShowAction,
  GroupAction,
  NextOrderAction,
  PrevOrderAction,
} from '@/components/ContextMenu/Actions';
import { CommonActionType } from '@/components/ContextMenu/Actions/type';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { getPath, getComponent } from '@/utils/Assist/Component';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

type ActionProps = {
  value?: ComponentData.TComponentData;
  path?: string;
  components: ComponentData.TComponentData[];
  setSelect: (value: string[]) => void;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  flag: ComponentData.ScreenFlagType;
  select: string[];
};

const useActionBarProps: (props: ActionProps) => CommonActionType = (props) => {
  const { select, components } = props;

  const lastSelect = useMemo(() => {
    return select[select.length - 1];
  }, [select]);

  const path: string = useMemo(() => {
    return getPath(select[select.length - 1]);
  }, [select]);

  const component = useMemo(() => {
    return getComponent(lastSelect, components);
  }, [lastSelect, components]);

  return {
    actionFrom: 'layer',
    childrenType: 'button',
    ...pick(props, [
      'flag',
      'setComponentAll',
      'setSelect',
      'components',
      'select',
    ]),
    clipboard: {
      timestamps: 0,
      value: [],
    },
    setClipboard: noop,
    setComponent: DataChangePool.setComponent,
    onClick: noop,
    value: component!,
    path,
    disabled: !select.length || !component,
  };
};

const _ActionHeaderBar = (props: ActionProps) => {
  const actionProps = useActionBarProps(props);

  return (
    <div
      className={styles['layer-action-bar-header']}
      style={!actionProps.disabled ? {} : { height: 0 }}
    >
      {!actionProps.disabled && (
        <Space size={'middle'}>
          <PrevOrderAction {...actionProps} />
          <NextOrderAction {...actionProps} />
          <TopAction {...actionProps} />
          <BottomAction {...actionProps} />
        </Space>
      )}
    </div>
  );
};

export const ActionHeaderBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ActionHeaderBar);

const _ActionFooterBar = (props: ActionProps) => {
  const actionProps = useActionBarProps(props);

  return (
    <div
      className={styles['layer-action-bar-footer']}
      style={!actionProps.disabled ? {} : { height: 0 }}
    >
      {!actionProps.disabled && (
        <Space size={'middle'}>
          <GroupAction {...actionProps} />
          <DeleteAction {...actionProps} />
          <LockAction {...actionProps} />
          <ShowAction {...actionProps} />
        </Space>
      )}
    </div>
  );
};

export const ActionFooterBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ActionFooterBar);
