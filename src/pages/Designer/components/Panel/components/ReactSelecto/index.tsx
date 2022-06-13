import { useCallback, useRef, useMemo } from 'react';
import ReactSelecto from 'react-selecto';
import { connect } from 'dva';
import { BACKGROUND_ID } from '@/components/DesignerBackground';
import {
  isComponentDisabled,
  isComponentSelect,
} from '@/utils/Assist/Component';
import ThemeUtil from '@/utils/Assist/Theme';
import ColorSelect from '@/components/ColorSelect';
import { ConnectState } from '@/models/connect';
import { wrapperId } from '../PanelWrapper/constants';
import { PANEL_ID } from '../Painter';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const VALID_SELECT_CONTAINER = [BACKGROUND_ID, wrapperId, PANEL_ID];

const { getRgbaString } = ColorSelect;

const Selecto = (props: {
  select: string[];
  setSelect: (value: string[]) => void;
  screenType: ComponentData.ScreenType;
}) => {
  const { select, setSelect, screenType } = props;

  const currentSelect = useRef<string[]>(select);

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
        // 组件边框
        const componentBorder = e.inputEvent.target.className.includes(
          'react-select-to-border',
        );
        // 辅助线
        const guideLine =
          e.inputEvent.target.className.includes('ruler-guide-line');
        // 标尺
        const ruler = e.inputEvent.target.tagName.toLowerCase();

        if (
          VALID_SELECT_CONTAINER.includes(id) ||
          (!componentBorder &&
            !guideLine &&
            ruler !== 'canvas' &&
            !isComponentSelect(componentId))
        ) {
          setSelect?.([]);
        } else {
          e.stop();
        }
      } catch (err) {
        e.stop();
      }
    },
    [select, setSelect],
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

const InternalSelecto = connect(mapStateToProps, mapDispatchToProps)(Selecto);

const OuterSelecto = (props: { theme: string }) => {
  const { theme } = props;

  const color = useMemo(() => {
    return ThemeUtil.generateNextColor4CurrentTheme(0);
  }, [theme]);

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
      <InternalSelecto />
    </div>
  );
};

export default connect(
  (state: ConnectState) => {
    return {
      theme: state.global.screenData.config.attr.theme,
    };
  },
  () => ({}),
)(OuterSelecto);
