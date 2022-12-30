import { useCallback, useRef, useMemo, useEffect } from 'react';
import { Space } from 'antd';
import classnames from 'classnames';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { useHover, useRafState } from 'ahooks';
import { useComponentHover } from '@/hooks';
import ContextMenu from '@/components/ContextMenu';
import { ActionItemType } from '@/components/ContextMenu/action.map';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import { COMPONENT_ICON_MAP } from '../../../../../../../../utils/component';
import VisibleEditor from './Visible';
import NameEditor, { NameEditorRefProps } from './NameEdit';
import LockEditor from './Lock';
import styles from './index.less';
import { useLayerHover } from '@/hooks';

const ListItem = ({
  value,
  path,
  update,
  isLeaf,
  disabled,
  isExpend,
  iconMode,
}: {
  value: ComponentData.TComponentData;
  path: string;
  update?: () => void;
  isLeaf: boolean;
  disabled?: boolean;
  isExpend: boolean;
  iconMode: boolean;
}) => {
  const {
    id,
    config: {
      attr: { visible, lock },
    },
    parent,
    componentType,
  } = value;

  const [isHover, setIsHover] = useRafState(false);

  const editRef = useRef<NameEditorRefProps>(null);
  const listItemRef = useRef<any>();

  const [, , eventBinder] = useComponentHover();

  const [, setHover] = useLayerHover();

  useHover(listItemRef, {
    onChange: (state) => {
      if (state) {
        setHover(id);
      } else {
        setHover('');
      }
    },
  });

  const icon = useMemo(() => {
    return COMPONENT_ICON_MAP[componentType];
  }, [componentType]);

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

  const hoverStyle = useMemo(() => {
    if (!isHover) return {};
    return {
      color: DEFAULT_THEME_COLOR,
      opacity: 1,
    };
  }, [isHover]);

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
          className={classnames(
            styles['design-page-layer-item-icon'],
            styles['design-page-layer-item-icon-leaf'],
            'm-r-8',
          )}
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

  useEffect(() => {
    return eventBinder((hoverSelect) => {
      setIsHover(id === hoverSelect);
    });
  }, []);

  return (
    <ContextMenu
      actionIgnore={['undo', 'redo']}
      value={value}
      path={path}
      onClick={handleEditName}
      actionFrom="layer"
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
          },
          'dis-flex',
          'p-lr-4',
        )}
        style={hoverStyle}
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

export default ListItem;
