import { useCallback, useRef, useMemo } from 'react';
import { Space } from 'antd';
import { connect } from 'dva';
import { useDebounceEffect } from 'ahooks';
import classnames from 'classnames';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useHover } from 'ahooks';
import ContextMenu from '@/components/ContextMenu';
import { ActionItemType } from '@/components/ContextMenu/action.map';
import DataChangePool from '@/utils/Assist/DataChangePool';
import VisibleEditor from './Visible';
import NameEditor, { NameEditorRefProps } from './NameEdit';
import LockEditor from './Lock';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ListItem = ({
  value,
  path,
  update,
  isLeaf,
  disabled,
  isExpend,
  iconMode,
  isSelect,
  setHoverSelect,
}: {
  value: ComponentData.TComponentData;
  setHoverSelect: (value: string) => void;
  path: string;
  update?: () => void;
  isLeaf: boolean;
  disabled?: boolean;
  isExpend: boolean;
  iconMode: boolean;
  isSelect: boolean;
}) => {
  const {
    id,
    config: {
      attr: { visible, lock },
    },
    icon,
    parent,
  } = value;

  const editRef = useRef<NameEditorRefProps>(null);
  const listItemRef = useRef<any>();

  const isHover = useHover(listItemRef);

  const setComponent = useCallback(
    (value: ComponentMethod.SetComponentMethodParamsData) => {
      DataChangePool.setComponent?.(value);
      update?.();
    },
    [],
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
    [setComponent],
  );

  const handleEditName = useCallback((type: ActionItemType) => {
    if (type === 'edit_name') {
      editRef.current?.changeEditStatus(true);
    }
  }, []);

  const handleSelect = useCallback(
    (e) => {
      if (disabled) {
        e.stopPropagation();
      }
    },
    [disabled],
  );

  const treeNodeIcon = useMemo(() => {
    if (!iconMode) return null;
    if (isLeaf) {
      return (
        <div
          className={classnames(styles['design-page-layer-item-icon'], 'm-r-8')}
        >
          <img src={icon} />
        </div>
      );
    }
    return (
      <div
        className={classnames(styles['design-page-layer-item-icon'], 'm-r-8')}
      >
        {isExpend ? <FolderOpenOutlined /> : <FolderOutlined />}
      </div>
    );
  }, [isLeaf, icon, isExpend, iconMode]);

  useDebounceEffect(
    () => {
      if (isHover) {
        setHoverSelect(id);
      } else {
        setHoverSelect('');
      }
    },
    [isHover, id, setHoverSelect],
    { wait: 50 },
  );

  return (
    <ContextMenu
      actionIgnore={['undo', 'redo']}
      value={value}
      path={path}
      onClick={handleEditName}
    >
      <div
        className={classnames(
          styles['design-page-layer-item'],
          {
            [styles['design-page-layer-item-hover']]: !disabled,
            [styles['design-page-layer-item-mode-icon']]: iconMode,
            [styles['design-page-layer-item-mode-list']]: !iconMode,
            [styles['design-page-layer-item-disabled']]: !!disabled,
            [styles['design-page-layer-item-lock']]: !!lock,
            [styles['design-page-layer-item-select']]: !!isSelect,
          },
          'dis-flex',
          'p-lr-4',
        )}
        onClick={handleSelect}
        ref={listItemRef}
      >
        {treeNodeIcon}
        <div className={classnames(styles['design-page-layer-item-name'])}>
          <NameEditor
            value={value}
            onChange={commonSetComponent}
            ref={editRef}
            disabled={disabled}
          />
        </div>
        <div
          className={classnames(
            styles['design-page-layer-item-action'],
            'dis-flex',
          )}
        >
          <Space size="large">
            <VisibleEditor
              disabled={disabled}
              visible={visible}
              onChange={commonSetComponent}
            />
            <LockEditor
              disabled={!!parent}
              lock={lock}
              onChange={commonSetComponent}
            />
          </Space>
        </div>
      </div>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
