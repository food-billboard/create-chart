import { ReactNode, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { useKeyPress } from 'ahooks';
import { copy } from '@/components/ContextMenu/Actions/Copy';
import { paste } from '@/components/ContextMenu/Actions/Paste';
import ConfirmModal, { ConfirmModalRef } from '@/components/ConfirmModal';
import { deleteAction } from '@/components/ContextMenu/Actions/Delete';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ClipboardComponent = (props: {
  children?: ReactNode;
  select: string[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setClipboard: (value: string[]) => void;
  setComponent: ComponentMethod.SetComponentMethod;
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
    setComponent,
    setSelect,
    undo,
    redo,
  } = props;

  const modalRef = useRef<ConfirmModalRef>(null);

  // copy
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    copy(select, setClipboard);
    message.info('复制成功');
  });

  // paste
  useKeyPress(['ctrl.v', 'meta.v'], () => {
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
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    undo();
  });

  // redo
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    redo();
  });

  // delete
  useKeyPress(['backspace', 'delete'], () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    modalRef.current?.open();
  });

  const handleDelete = useCallback(() => {
    deleteAction(select, setComponent);
  }, [setComponent, select]);

  return (
    <>
      {children}
      <ConfirmModal onOk={handleDelete} ref={modalRef}>
        是否确定删除组件
      </ConfirmModal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent);
