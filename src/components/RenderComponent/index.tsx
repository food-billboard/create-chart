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
      attr: { visible, lock },
    },
  } = value;

  const hoverRef = useRef<any>();

  const isHover = useHover(hoverRef);

  const baseStyle: CSSProperties = useMemo(() => {
    const { rotate, width, height, left, top, ...nextComponentStyle } =
      componentStyle;
    return merge(
      {},
      nextComponentStyle,
      {
        transform: `rotate(${rotate}deg)`,
        display: visible ? 'inline-block' : 'none',
        borderWidth: (1 / scale) * 100,
      },
      style,
    );
  }, [componentStyle, style, visible, scale]);

  const isSelect = useMemo(() => {
    return select?.includes(id);
  }, [select, id]);

  const handleSelect = useCallback(
    (e: any) => {
      e?.stopPropagation();
      if (!select?.includes(id)) setSelect?.([id]);
    },
    [setSelect, id, select],
  );

  const onVisibleChange = useCallback(
    (visible) => {
      if (visible) handleSelect(null);
    },
    [handleSelect],
  );

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

  return (
    <ContextMenu onVisibleChange={onVisibleChange}>
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
      >
        <div
          ref={hoverRef}
          className={classnames(styles['render-component-content'], {
            'c-po': !isSelect,
          })}
          onClick={handleSelect}
        >
          <Content />
        </div>
      </ComponentWrapper>
    </ContextMenu>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
