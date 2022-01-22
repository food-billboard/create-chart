import { useCallback } from 'react';
import { Space } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import ContextMenu from '@/components/ContextMenu';
import VisibleEditor from './Visible';
import NameEditor from './NameEdit';
import LockEditor from './Lock';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ListItem = ({
  value,
  setComponent: propsSetComponent,
  select,
  setSelect,
  path,
  update,
}: {
  value: ComponentData.TComponentData;
  setComponent?: ComponentMethod.SetComponentMethod;
  select: string[];
  setSelect: (value: string[]) => void;
  path: string;
  update?: () => void;
}) => {
  const {
    id,
    config: {
      attr: { visible, lock },
    },
  } = value;

  const setComponent = useCallback(
    (value: ComponentMethod.SetComponentMethodParamsData) => {
      propsSetComponent?.(value);
      update?.();
    },
    [propsSetComponent],
  );

  const commonSetComponent = useCallback(
    (value: SuperPartial<ComponentData.TComponentData>) => {
      setComponent({
        value,
        id,
        path,
        action: 'update',
      });
    },
    [],
  );

  return (
    <ContextMenu actionIgnore={['undo', 'redo']} value={value} path={path}>
      <div className={classnames(styles['design-page-layer-item'], 'dis-flex')}>
        <div className={classnames(styles['design-page-layer-item-name'])}>
          <NameEditor
            value={value}
            onChange={commonSetComponent}
            select={select}
            setSelect={setSelect}
          />
        </div>
        <div
          className={classnames(
            styles['design-page-layer-item-action'],
            'dis-flex',
          )}
        >
          <Space size="large">
            <VisibleEditor visible={visible} onChange={commonSetComponent} />
            <LockEditor lock={lock} onChange={commonSetComponent} />
          </Space>
        </div>
      </div>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
