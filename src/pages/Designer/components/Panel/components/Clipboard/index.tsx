import { ReactNode } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { useKeyPress } from 'ahooks';
import { copy } from '@/components/ContextMenu/Actions/Copy';
import { paste } from '@/components/ContextMenu/Actions/Paste';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
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
  } = props;

  // copy
  useKeyPress('ctrl.c', () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    copy(select, setClipboard);
    message.info('复制成功');
  });

  // paste
  useKeyPress('ctrl.v', () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    paste({
      components,
      setComponentAll,
      setSelect,
      clipboard,
      sourceComponents: components,
    });
    message.info('新增成功');
  });

  // undo
  useKeyPress('ctrl.z', () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    undo();
  });

  // redo
  useKeyPress('ctrl.y', () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    redo();
  });

  return <>{children}</>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent);
