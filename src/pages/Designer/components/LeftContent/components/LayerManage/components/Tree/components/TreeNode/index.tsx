import { useCallback, useRef } from 'react';
import { Space } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import ContextMenu from '@/components/ContextMenu';
import { ActionItemType } from '@/components/ContextMenu/action.map';
import VisibleEditor from './Visible';
import NameEditor, { NameEditorRefProps } from './NameEdit';
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
  isLeaf,
}: {
  value: ComponentData.TComponentData;
  setComponent?: ComponentMethod.SetComponentMethod;
  select: string[];
  setSelect: (value: string[]) => void;
  path: string;
  update?: () => void;
  isLeaf: boolean;
}) => {
  const {
    id,
    config: {
      attr: { visible, lock },
    },
    icon,
  } = value;

  const editRef = useRef<NameEditorRefProps>(null);

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

  const handleEditName = useCallback((type: ActionItemType) => {
    if (type === 'edit_name') {
      editRef.current?.changeEditStatus(true);
    }
  }, []);

  return (
    <ContextMenu
      actionIgnore={['undo', 'redo']}
      value={value}
      path={path}
      onClick={handleEditName}
    >
      <div className={classnames(styles['design-page-layer-item'], 'dis-flex')}>
        {isLeaf && (
          <div
            className={classnames(
              styles['design-page-layer-item-icon'],
              'm-r-8',
            )}
          >
            <img src={icon} />
          </div>
        )}
        <div className={classnames(styles['design-page-layer-item-name'])}>
          <NameEditor
            value={value}
            onChange={commonSetComponent}
            select={select}
            setSelect={setSelect}
            ref={editRef}
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
