import {
  FolderOutlined,
  FolderOpenOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHover, useRafState } from 'ahooks';
import { Space } from 'antd';
import classnames from 'classnames';
import {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  CSSProperties,
  useTransition,
  cloneElement,
} from 'react';
import ContextMenu from '@/components/ContextMenu';
import { ActionItemType } from '@/components/ContextMenu/action.map';
import { useComponentHover, useLayerHover } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import {
  COMPONENT_ICON_MAP,
  COMPONENT_TOP_ICON_MAP,
} from '../../../../../../../../utils/component';
import LockEditor from './Lock';
import NameEditor, { NameEditorRefProps } from './NameEdit';
import VisibleEditor from './Visible';
import styles from './index.less';

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

  const [, transitionFn] = useTransition();
  const [isHover, setIsHover] = useRafState(false);

  const editRef = useRef<NameEditorRefProps>(null);
  const listItemRef = useRef<any>();

  const [, , eventBinder] = useComponentHover();

  const [, setHover] = useLayerHover();

  useHover(listItemRef, {
    onChange: (state) => {
      transitionFn(() => {
        if (state) {
          setHover(id);
        } else {
          setHover('');
        }
      });
    },
  });

  const icon = useMemo(() => {
    return COMPONENT_ICON_MAP[componentType];
  }, [componentType]);

  const parentIcon = useMemo(() => {
    const icon = COMPONENT_TOP_ICON_MAP[componentType];
    if (!icon) {
      return <QuestionCircleOutlined />;
    }
    return cloneElement(icon as any, {
      className: 'p-lr-6',
    });
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

  const handleEditName: any = useCallback((type: ActionItemType) => {
    if (type === 'edit_name') {
      editRef.current?.changeEditStatus(true);
    }
  }, []);

  const hoverStyle = useMemo(() => {
    if (!isHover) return {};
    let style: CSSProperties = {
      opacity: 1,
    };
    return style;
    // return {
    //   ...style,
    //   color: DEFAULT_THEME_COLOR,
    // };
  }, [isHover, id]);

  const handleSelect = useCallback(
    (e) => {
      if (disabled) {
        e.stopPropagation();
      }
    },
    [disabled],
  );

  const treeNodeIcon = useMemo(() => {
    if (!iconMode) {
      if (isLeaf) {
        return parentIcon;
      } else {
        return isExpend ? (
          <FolderOpenOutlined className="p-lr-6" />
        ) : (
          <FolderOutlined className="p-lr-6" />
        );
      }
    }
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
        className={classnames(
          styles['design-page-layer-item-icon'],
          'm-r-8 ac-i-size-m',
        )}
      >
        {isExpend ? <FolderOpenOutlined /> : <FolderOutlined />}
      </div>
    );
  }, [isLeaf, icon, isExpend, iconMode, parentIcon]);

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
