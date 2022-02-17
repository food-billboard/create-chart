import { useCallback } from 'react';
import ReactSelecto from 'react-selecto';
import { connect } from 'dva';
import { BACKGROUND_ID } from '@/components/DesignerBackground';
import { isComponentDisabled } from '@/utils/Assist/Component';
import { wrapperId } from '../PanelWrapper';
import { PANEL_ID } from '../Painter';
import { mapStateToProps, mapDispatchToProps } from './connect';

const VALID_SELECT_CONTAINER = [BACKGROUND_ID, wrapperId, PANEL_ID];

const Selecto = (props: {
  select: string[];
  setSelect: (value: string[]) => void;
}) => {
  const { select, setSelect } = props;

  const handleSelect = useCallback(
    (e: any) => {
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
        ...select.filter((item) => !toRemoveList.includes(item)),
        ...toAddList,
      ];

      setSelect(newSelect);
    },
    [setSelect, select],
  );

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
      onSelect={handleSelect}
    ></ReactSelecto>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Selecto);
