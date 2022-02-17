import { CSSProperties, useMemo, useCallback } from 'react';
import { merge } from 'lodash';
import classnames from 'classnames';
import { connect } from 'dva';
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
    style,
    className,
    value,
    select,
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
      attr: { visible, lock, scaleX = 1, scaleY = 1 },
    },
  } = value;

  const isSelect = useMemo(() => {
    return select?.includes(id);
  }, [select, id]);

  const baseStyle: CSSProperties = useMemo(() => {
    const { rotate, width, height, left, top, zIndex, ...nextComponentStyle } =
      componentStyle;
    return merge(
      {},
      nextComponentStyle,
      {
        transform: `rotate(${rotate}deg)`,
        display: visible ? 'inline-block' : 'none',
        borderWidth: (1 / scale) * 100,
        zIndex: isSelect ? 4 : zIndex,
        pointerEvents: lock ? 'none' : 'unset',
      },
      style,
    );
  }, [componentStyle, style, visible, scale, isSelect, lock]);

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

  const childrenStyle = useMemo(() => {
    const { width, height, opacity, rotate } = componentStyle;
    return {
      width: width / scaleX,
      height: height / scaleY,
      transform: `scale(${scaleX}, ${scaleY}) rotate(${rotate}deg)`,
      opacity: opacity,
    };
  }, [componentStyle, scaleX, scaleY]);

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
          className={classnames(styles['render-component-content'], 'pos-re', {
            'c-po': !isSelect,
          })}
          onClick={handleSelect}
          style={childrenStyle}
        >
          {content}
        </div>
      </ComponentWrapper>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
