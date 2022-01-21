import { useCallback } from 'react';
import ReactSelecto from 'react-selecto';
import { connect } from 'dva';
import { wrapperId } from '../PanelWrapper';
import { mapStateToProps, mapDispatchToProps } from './connect';

const Selecto = (props: {
  select: string[];
  setSelect: (value: string[]) => void;
}) => {
  const { select, setSelect } = props;

  const handleSelect = useCallback(
    (e: any) => {
      const { added, removed } = e;

      const toAddList = added.map((element: any) => element.dataset.id);
      const toRemoveList = removed.map((element: any) => element.dataset.id);

      const newSelect = [
        ...select.filter((item) => !toRemoveList.includes(item)),
        ...toAddList,
      ];

      setSelect(newSelect);
    },
    [setSelect, select],
  );

  return (
    <ReactSelecto
      dragContainer={`#${wrapperId}`}
      selectableTargets={['.react-select-to']}
      hitRate={100}
      selectByClick={true}
      selectFromInside={true}
      ratio={0}
      onSelectStart={setSelect?.bind(null, [])}
      onSelect={handleSelect}
    ></ReactSelecto>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Selecto);
