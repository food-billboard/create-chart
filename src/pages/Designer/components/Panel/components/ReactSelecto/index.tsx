import { useCallback, useRef } from 'react';
import ReactSelecto from 'react-selecto';
import { connect } from 'dva';
import { BACKGROUND_ID } from '@/components/DesignerBackground';
import { isComponentDisabled } from '@/utils/Assist/Component';
import { wrapperId } from '../PanelWrapper/constants';
import { PANEL_ID } from '../Painter';
import { mapStateToProps, mapDispatchToProps } from './connect';

const VALID_SELECT_CONTAINER = [BACKGROUND_ID, wrapperId, PANEL_ID];

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

  const handleDragStart = useCallback((e: any) => {
    try {
      const id = e.inputEvent.target.id;
      if (VALID_SELECT_CONTAINER.includes(id)) {
        setSelect?.([]);
      } else {
        e.stop();
      }
    } catch (err) {
      e.stop();
    }
  }, []);

  return (
    <ReactSelecto
      dragContainer={`#${wrapperId}`}
      selectableTargets={['.react-select-to']}
      hitRate={100}
      selectByClick={true}
      selectFromInside={true}
      ratio={0}
      onDragStart={handleDragStart}
      onSelectEnd={handleSelectEnd}
      onSelect={handleSelect}
    ></ReactSelecto>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Selecto);
