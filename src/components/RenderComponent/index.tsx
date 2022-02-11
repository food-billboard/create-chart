import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { merge } from 'lodash';
import classnames from 'classnames';
import { useHover } from 'ahooks';
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
  } = props;

  const {
    id,
    config: {
      style: componentStyle,
      attr: { visible, lock, scaleX = 1, scaleY = 1 },
    },
  } = value;

  const hoverRef = useRef<any>();

  const isHover = useHover(hoverRef);

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
      },
      style,
    );
  }, [componentStyle, style, visible, scale, isSelect]);

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

  return (
    <ContextMenu value={value}>
      <ComponentWrapper
        style={baseStyle}
        className={classnames(className, 'react-select-to', {
          'border-1': isHover && !isSelect,
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
        disabled={!isSelect || lock}
        setComponent={setComponent}
        scale={scale / 100}
        onDragStart={selectOnly}
        onResizeStart={selectOnly}
      >
        <div
          ref={hoverRef}
          className={classnames(styles['render-component-content'], 'pos-re', {
            'c-po': !isSelect,
          })}
          onClick={handleSelect}
          style={childrenStyle}
        >
          <Content value={value} />
        </div>
      </ComponentWrapper>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
