import { CSSProperties, useMemo, useRef, useCallback } from 'react';
import { merge } from 'lodash';
import classnames from 'classnames';
import { useHover } from 'ahooks';
import { connect } from 'dva';
import ComponentWrapper from './components/Wrapper';
import Content from './components/Content';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

export type RenderComponentProps = {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData;
  select?: string[];
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
      },
      style,
    );
  }, [componentStyle, style, visible]);

  const isSelect = useMemo(() => {
    return select?.length === 1 && select[0] === id;
  }, [select, id]);

  const handleSelect = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!select?.includes(id)) setSelect?.([id]);
    },
    [setSelect, id, select],
  );

  const setComponent = useCallback(
    (
      callback: (
        value: ComponentData.TComponentData,
      ) => SuperPartial<ComponentData.TComponentData>,
    ) => {
      const result = callback(value);
      propsSetComponent?.({
        ...result,
        id: value.id,
        __action__: 'update',
      });
    },
    [value, propsSetComponent],
  );

  return (
    <ComponentWrapper
      style={baseStyle}
      className={classnames(className, {
        'border-1': isHover && !isSelect,
        'border-1-a': isSelect,
      })}
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
