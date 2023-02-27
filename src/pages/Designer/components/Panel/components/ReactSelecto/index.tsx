import { useCallback, useRef, useMemo } from 'react';
import ReactSelecto from 'react-selecto';
import { useMobxContext } from '@/hooks';
import { BACKGROUND_ID } from '@/components/DesignerBackground';
import {
  isComponentDisabled,
  isComponentSelect,
} from '@/utils/Assist/Component';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '@/components/ColorSelect';
import { getGlobalSelect } from '@/utils/Assist/GlobalDva';
import { SELECTO_CLASSNAME } from '@/utils/constants';
import { wrapperId } from '../PanelWrapper/constants';
import { PANEL_ID } from '../Painter';
import styles from './index.less';

const VALID_SELECT_CONTAINER = [BACKGROUND_ID, wrapperId, PANEL_ID];

const { getRgbaString } = ColorSelect;

const Selecto = () => {
  const {
    global: { setSelect, screenType },
  } = useMobxContext();

  const currentSelect = useRef<string[]>([]);

  if (screenType === 'preview') return <></>;

  const handleSelectEnd = useCallback(() => {
    setSelect(currentSelect.current);
  }, [setSelect]);

  const handleSelect = useCallback((e: any) => {
    const { added, removed } = e;

    const toAddList = added.reduce((acc: any, element: any) => {
      const select = element.dataset.id;
      if (!isComponentDisabled(select)) {
        acc.push(select);
      }
      return acc;
    }, []);
    const toRemoveList = removed.map((element: any) => element.dataset.id);

    const newSelect = [
      ...currentSelect.current.filter((item) => !toRemoveList.includes(item)),
      ...toAddList,
    ];
    currentSelect.current = newSelect;
  }, []);

  const handleDragStart = useCallback(
    (e: any) => {
      try {
        // 背景 大画布等
        const id = e.inputEvent.target.id;
        // 组件id
        const componentId = e.inputEvent.target.dataset?.id;
        // 组件边框 或其他一些
        const componentBorder =
          e.inputEvent.target.className.includes(SELECTO_CLASSNAME);
        // 辅助线
        const guideLine =
          e.inputEvent.target.className.includes('ruler-guide-line');
        // 标尺
        const ruler = e.inputEvent.target.tagName.toLowerCase();

        const select = getGlobalSelect();

        if (
          VALID_SELECT_CONTAINER.includes(id) ||
          (!componentBorder &&
            !guideLine &&
            ruler !== 'canvas' &&
            !isComponentSelect(componentId, select))
        ) {
          setSelect?.([]);
        } else {
          e.stop();
        }
      } catch (err) {
        e.stop();
      }
    },
    [setSelect],
  );

  return (
    <ReactSelecto
      dragContainer={`#${wrapperId}`}
      selectableTargets={['.react-select-to']}
      hitRate={10}
      toggleContinueSelect={'shift'}
      selectByClick
      selectFromInside
      ratio={0}
      onDragStart={handleDragStart}
      onSelectEnd={handleSelectEnd}
      onSelect={handleSelect}
    ></ReactSelecto>
  );
};

const OuterSelecto = () => {
  const {
    global: {
      screenData: {
        config: {
          attr: { theme },
        },
      },
    },
  } = useMobxContext();

  const color = useMemo(() => {
    return ThemeUtil.generateNextColor4CurrentTheme(0);
  }, [theme.value]);

  return (
    <div
      style={{
        // @ts-ignore
        '--react-select-to-border': getRgbaString(color),
        '--react-select-to-background': getRgbaString({
          ...color,
          a: 0.4,
        }),
      }}
      className={styles['react-select-to-wrapper']}
    >
      <Selecto />
    </div>
  );
};

export default OuterSelecto;
