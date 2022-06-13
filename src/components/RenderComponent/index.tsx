import {
  CSSProperties,
  useMemo,
  useCallback,
  memo,
  ReactNode,
  useRef,
} from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { isEqual } from 'lodash';
import { useIsComponentChildrenSelect, useComponentStyle } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
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
  setComponentAll: (
    value:
      | ComponentData.TComponentData[]
      | ((
          value: ComponentData.TComponentData[],
        ) => ComponentData.TComponentData[]),
  ) => void;
  path?: string;
  screenType: ComponentData.ScreenType;
  timestamps?: number;
  hoverSelect: string;
  grid: number;
};

const OnlyClickDiv = (props: {
  onClick?: (e: any) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}) => {
  const { children, onClick, ...nextProps } = props;
  const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onMouseDown = useCallback((e) => {
    return;
    const { clientX, clientY } = e;
    currentPosition.current = {
      x: clientX,
      y: clientY,
    };
  }, []);

  const onMouseUp = useCallback(
    (e) => {
      return;
      const { clientX, clientY } = e;
      const { x, y } = currentPosition.current;
      if (Math.abs(x - clientX) < 5 && Math.abs(y - clientY) < 5) onClick?.(e);
    },
    [onClick],
  );

  return (
    <div {...nextProps} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
};

const RenderComponent = memo(
  (props: RenderComponentProps) => {
    const {
      style = {},
      className,
      value,
      select = [],
      setSelect,
      scale,
      index,
      path,
      screenType,
      timestamps,
      hoverSelect,
      grid,
    } = props;

    const {
      id,
      config: {
        style: componentStyle,
        attr: { lock, scaleX, scaleY },
      },
      type,
    } = value;

    const isSelect = useIsComponentChildrenSelect(
      [value],
      [...select, hoverSelect],
    );

    // 是否响应鼠标事件
    const pointerDisabled = useMemo(() => {
      return screenType === 'preview' || lock;
    }, [lock, screenType, isSelect]);

    const baseStyle = useComponentStyle(value, {
      isSelect,
      scale,
      style,
      query: `div[data-id="${id}"]`,
    });

    // const handleSelect = useCallback(
    //   (e: any) => {
    //     e?.stopPropagation();
    //     if (!pointerDisabled && !select?.includes(id)) {
    //       setSelect?.([id]);
    //     }
    //   },
    //   [setSelect, id, select, pointerDisabled],
    // );

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
        DataChangePool.multiSetComponent({
          value: result,
          id: value.id,
          action: 'update',
          path: index.toString(),
        });
      },
      [value, index, select],
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
          type={type}
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
          select={select}
          pointerDisabled={pointerDisabled}
          setComponent={setComponent}
          scale={scale / 100}
          componentScale={{
            scaleX,
            scaleY,
          }}
          componentId={id}
          isSelect={isSelect}
          grid={grid}
        >
          <OnlyClickDiv
            className={classnames(
              styles['render-component-content'],
              'w-100',
              'h-100',
              'pos-re',
              {
                'c-po': !isSelect,
              },
            )}
            data-id={id}
            // onClick={handleSelect}
          >
            {content}
          </OnlyClickDiv>
        </ComponentWrapper>
      </ContextMenu>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
