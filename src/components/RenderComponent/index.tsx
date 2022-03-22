import { CSSProperties, useMemo, useCallback, memo } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { isEqual } from 'lodash';
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
  screenType: ComponentData.ScreenType;
  timestamps?: number;
};

const RenderComponent = memo(
  (props: RenderComponentProps) => {
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
      screenType,
      timestamps,
    } = props;

    const {
      id,
      config: {
        style: componentStyle,
        attr: { lock },
      },
    } = value;

    const isSelect = useIsComponentChildrenSelect([value], select);

    // 是否响应鼠标事件
    const pointerDisabled = useMemo(() => {
      return screenType === 'preview' || lock;
    }, [lock, screenType]);

    const baseStyle = useComponentStyle(value, {
      isSelect,
      scale,
      style,
    });

    const handleSelect = useCallback(
      (e: any) => {
        e?.stopPropagation();
        if (!pointerDisabled && !select?.includes(id)) {
          setSelect?.([id]);
        }
      },
      [setSelect, id, select, pointerDisabled],
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
      return <Content component={value} timestamps={timestamps} />;
    }, [value, timestamps]);

    return (
      <ContextMenu
        value={value}
        actionIgnore={['undo', 'redo', 'edit_name']}
        path={path}
        disabled={pointerDisabled}
      >
        <ComponentWrapper
          style={baseStyle}
          className={classnames(className, 'react-select-to', {
            [styles['render-component-wrapper']]:
              !isSelect && screenType !== 'preview',
            'border-1-a': isSelect && screenType !== 'preview',
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
          pointerDisabled={pointerDisabled}
          setComponent={setComponent}
          scale={scale / 100}
          onDragStart={selectOnly}
          onResizeStart={selectOnly}
          componentId={id}
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
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
