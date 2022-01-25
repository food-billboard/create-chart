import { ReactNode, useEffect } from 'react';
import { connect } from 'dva';
import { useKeyPress } from 'ahooks';
import { copy } from '@/components/ContextMenu/Actions/Copy';
import { paste } from '@/components/ContextMenu/Actions/Paste';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ClipboardComponent = (props: {
  children?: ReactNode;
  select: string[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setClipboard: (value: string[]) => void;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  setSelect: (value: string[]) => void;
  undo: () => void;
  redo: () => void;
  isFocusWithin: boolean;
}) => {
  const {
    children,
    clipboard,
    select,
    setClipboard,
    components,
    setComponentAll,
    setSelect,
    undo,
    redo,
    isFocusWithin,
  } = props;

  // copy
  useKeyPress('ctrl.c', () => {
    if (!isFocusWithin) return;
    copy(select, setClipboard);
  });

  // paste
  useKeyPress('ctrl.v', () => {
    if (!isFocusWithin) return;
    paste({
      components,
      setComponentAll,
      setSelect,
      clipboard,
      sourceComponents: components,
    });
  });

  // undo
  useKeyPress('ctrl.z', () => {
    if (!isFocusWithin) return;
    undo();
  });

  // redo
  useKeyPress('ctrl.y', () => {
    if (!isFocusWithin) return;
    redo();
  });

  useEffect(() => {
    console.log(isFocusWithin, 'isFocusWithin');
  }, [isFocusWithin]);

  return (
    <>
      {children}
      {/* <label style={{ display: 'block' }}>
        First Name: <input />
      </label> */}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent);
