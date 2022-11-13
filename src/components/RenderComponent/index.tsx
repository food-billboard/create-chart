import {
  CSSProperties,
  useMemo,
  useCallback,
  memo,
  ReactNode,
  useRef,
  useState,
  useContext,
} from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { isEqual } from 'lodash';
import { useComponentStyle } from '@/hooks';
import DataChangePool from '@/utils/Assist/DataChangePool';
import ComponentWrapper from './components/Wrapper';
import Content from './components/Content';
import ContextMenu from '../ContextMenu';
import ConnectSelectChangeWrapper from './components/SelectChangeWrapper';
import HoverChangeWrapper from './components/HoverChangeWrapper';
import { ExchangePreviewerContext } from '../../pages/Designer/components/ExchangeScreenFlag/components/MobilePreviewer/context';
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
  path?: string;
  screenType: ComponentData.ScreenType;
  timestamps?: number;
  grid: number;
  flag: ComponentData.ScreenFlagType;
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
      scale,
      index,
      path,
      screenType,
      timestamps,
      grid,
      flag,
    } = props;

    const {
      id,
      config: {
        style: componentStyle,
        attr: { lock, scaleX, scaleY },
      },
      type,
    } = value;

    const { mobilePreviewerAble } = useContext(ExchangePreviewerContext);

    const [isSelect, setIsSelect] = useState<boolean>(false);

    // 是否响应鼠标事件
    const pointerDisabled = useMemo(() => {
      return mobilePreviewerAble || screenType === 'preview' || lock;
    }, [lock, screenType, isSelect, mobilePreviewerAble]);

    const realFlag = useMemo(() => {
      return mobilePreviewerAble ? 'H5' : flag;
    }, [mobilePreviewerAble, flag]);

    const baseStyle = useComponentStyle(value, {
      isSelect,
      scale,
      style,
      query: `div[data-id="${id}"]`,
      screenType,
    });

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

    const children = useMemo(() => {
      return (
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
        >
          {content}
          <ConnectSelectChangeWrapper
            value={value}
            onSelectChange={setIsSelect}
          />
          <HoverChangeWrapper id={id} />
        </OnlyClickDiv>
      );
    }, [isSelect, id, content, value]);

    return (
      <ContextMenu
        value={value}
        actionIgnore={['undo', 'redo', 'edit_name']}
        path={path}
        disabled={pointerDisabled}
        actionFrom="screen"
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
          position={
            realFlag === 'H5'
              ? { x: 0, y: 0 }
              : {
                  x: componentStyle.left,
                  y: componentStyle.top,
                }
          }
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
          flag={realFlag}
        >
          {children}
        </ComponentWrapper>
      </ContextMenu>
    );
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
