import { CSSProperties, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { useIsComponentChildrenSelect, useComponentStyle } from '@/hooks';
import ComponentWrapper from './components/Wrapper';
import Content from './components/Content';
import ContextMenu from '../ContextMenu';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

export type RenderComponentProps = {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData;
  index: number;
  select?: string[];
  scale: number;
  setSelect?: (value: string[]) => void;
  setComponent?: ComponentMethod.SetComponentMethod;
  path?: string;
};

const RenderComponent = (props: RenderComponentProps) => {
  const {
    style = {},
    className,
    value,
    select = [],
    setSelect,
    setComponent: propsSetComponent,
    scale,
    index,
    path,
  } = props;

  const {
    id,
    config: {
      style: componentStyle,
      attr: { lock },
    },
  } = value;

  const isSelect = useIsComponentChildrenSelect([value], select);

  const baseStyle = useComponentStyle(value, {
    isSelect,
    scale,
    style,
  });

  const handleSelect = useCallback(
    (e: any) => {
      e?.stopPropagation();
      if (!select?.includes(id)) setSelect?.([id]);
    },
    [setSelect, id, select],
  );

  const selectOnly = useCallback(() => {
    setSelect?.([id]);
  }, [setSelect, id]);

  const setComponent = useCallback(
    (
      callback: (
        value: ComponentData.TComponentData,
      ) => SuperPartial<ComponentData.TComponentData>,
    ) => {
      const result = callback(value);
      propsSetComponent?.({
        value: result,
        id: value.id,
        action: 'update',
        path: index.toString(),
      });
    },
    [value, propsSetComponent, index],
  );

  const content = useMemo(() => {
    return <Content value={value} />;
  }, [value]);

  return (
    <ContextMenu
      value={value}
      actionIgnore={['undo', 'redo', 'edit_name']}
      path={path}
    >
      <ComponentWrapper
        style={baseStyle}
        className={classnames(className, 'react-select-to', {
          [styles['render-component-wrapper']]: !isSelect,
          'border-1-a': isSelect,
        })}
        data-id={id}
        size={{
          width: componentStyle.width,
          height: componentStyle.height,
        }}
        position={{
          x: componentStyle.left,
          y: componentStyle.top,
        }}
        pointerDisabled={!isSelect || lock}
        setComponent={setComponent}
        scale={scale / 100}
        onDragStart={selectOnly}
        onResizeStart={selectOnly}
      >
        <div
          className={classnames(
            styles['render-component-content'],
            'w-100',
            'h-100',
            'pos-re',
            {
              'c-po': !isSelect,
            },
          )}
          onClick={handleSelect}
        >
          {content}
        </div>
      </ComponentWrapper>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
