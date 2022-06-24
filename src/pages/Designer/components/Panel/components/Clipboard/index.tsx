import { ReactNode, useCallback, useRef, useMemo, useState } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import { useKeyPress } from 'ahooks';
import { clone } from '@/components/ContextMenu/Actions/Clone';
import { paste } from '@/components/ContextMenu/Actions/Paste';
import ConfirmModal, { ConfirmModalRef } from '@/components/ConfirmModal';
import { deleteAction } from '@/components/ContextMenu/Actions/Delete';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { getComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { sleep } from '@/utils';
import { mapStateToProps, mapDispatchToProps } from './connect';

const ClipboardComponent = (props: {
  children?: ReactNode;
  select: string[];
  components: ComponentData.TComponentData[];
  clipboard: string[];
  setClipboard: (value: string[]) => void;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  setSelect: (value: string[]) => void;
  screenType: ComponentData.ScreenType;
  undo: () => void;
  redo: () => void;
}) => {
  const {
    children,
    clipboard,
    select,
    setClipboard,
    components,
    setSelect,
    undo,
    redo,
    screenType,
  } = props;

  const [deleteModalContent, setDeleteModalContent] =
    useState<string>('是否确定删除组件');

  const modalRef = useRef<ConfirmModalRef>(null);

  const disabledKeyEvent = useMemo(() => {
    return screenType === 'preview';
  }, [screenType]);

  // copy
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus() || !select.length)
      return;
    clone(select, setClipboard);
    message.info('复制成功');
  });

  // paste
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus() || !clipboard.length)
      return;
    paste({
      components,
      setComponent: (_, newComponents) => {
        DataChangePool.setComponent(
          newComponents.map((item) => {
            return {
              value: item,
              id: item.id,
              action: 'add',
            };
          }),
        );
      },
      setSelect,
      clipboard,
      sourceComponents: components,
    });
    message.info('新增成功');
  });

  // undo
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus()) return;
    undo();
  });

  // redo
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (!CopyAndPasteUtil.isFocus()) return;
    redo();
  });

  // delete
  useKeyPress(['backspace', 'delete'], () => {
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus() || !select.length)
      return;

    const deleteContent = `是否删除：`;
    const componentList = select.map((item) => {
      const target = getComponent(item, components);
      return target.name;
    });
    setDeleteModalContent(
      deleteContent +
        componentList.slice(0, 10).join('，') +
        `${componentList.length > 10 ? '等' : '这'}${
          componentList.length
        }个组件`,
    );
    sleep(100).then(modalRef.current?.open);
  });

  const handleDelete = useCallback(() => {
    deleteAction(select, DataChangePool.setComponent, setSelect);
  }, [select]);

  return (
    <>
      {children}
      <ConfirmModal onOk={handleDelete} ref={modalRef}>
        {deleteModalContent}
      </ConfirmModal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent);
