import { ReactNode, useCallback, useRef, useMemo, useState } from 'react';
import { useKeyPress, useDebounceFn } from 'ahooks';
import { merge, get } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useIdPathMap, useMobxContext } from '@/hooks';
import { clone } from '@/components/ContextMenu/Actions/Clone';
import { paste } from '@/components/ContextMenu/Actions/Paste';
import ConfirmModal, { ConfirmModalRef } from '@/components/ConfirmModal';
import { deleteAction } from '@/components/ContextMenu/Actions/Delete';
import CopyAndPasteUtil from '@/utils/Assist/CopyAndPaste';
import { getGlobalSelect } from '@/utils/Assist/GlobalDva';
import { getComponent, getTopParentComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { sleep } from '@/utils';

const ClipboardComponent = (props: { children?: ReactNode }) => {
  const { children } = props;

  const {
    global: {
      undo,
      redo,
      setSelect,
      setClipboard,
      clipboard,
      components,
      screenType,
      screenData: {
        config: {
          attr: { grid },
        },
      },
    },
  } = useMobxContext();

  const [deleteModalContent, setDeleteModalContent] =
    useState<string>('是否确定删除组件');

  const modalRef = useRef<ConfirmModalRef>(null);

  const disabledKeyEvent = useMemo(() => {
    return screenType === 'preview';
  }, [screenType]);

  // copy
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    const select = getGlobalSelect();
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus() || !select.length)
      return;
    clone(select, setClipboard);
  });

  // paste
  useKeyPress(['ctrl.v', 'meta.v'], async () => {
    if (disabledKeyEvent || !CopyAndPasteUtil.isFocus()) return;
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
    const select = getGlobalSelect();
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

  const { run: positionAction } = useDebounceFn(
    (callback) => {
      if (!CopyAndPasteUtil.isFocus()) return;
      const delta = merge(
        {
          left: 0,
          top: 0,
        },
        callback(),
      );
      const idPathMap = useIdPathMap();
      const select = getGlobalSelect();
      DataChangePool.setComponent(
        select.map((item) => {
          const { id } = getTopParentComponent(item, components);
          const { config } = get(components, idPathMap[id].path);
          return {
            id,
            value: {
              config: {
                style: {
                  left: (get(config, 'style.left') || 0) + delta.left,
                  top: (get(config, 'style.top') || 0) + delta.top,
                },
              },
            },
            action: 'update',
          };
        }),
      );
    },
    {
      wait: 50,
    },
  );

  // 上移动
  useKeyPress(['shift.uparrow'], () => {
    positionAction(() => {
      return {
        top: -grid,
      };
    });
  });

  // 下移动
  useKeyPress(['shift.downarrow'], () => {
    positionAction(() => {
      return {
        top: grid,
      };
    });
  });

  // 左移动
  useKeyPress(['shift.leftarrow'], () => {
    positionAction(() => {
      return {
        left: -grid,
      };
    });
  });

  // 右移动
  useKeyPress(['shift.rightarrow'], () => {
    positionAction(() => {
      return {
        left: grid,
      };
    });
  });

  const handleDelete = useCallback(() => {
    const select = getGlobalSelect();
    deleteAction(select, DataChangePool.setComponent, setSelect);
  }, []);

  return (
    <>
      {children}
      <ConfirmModal onOk={handleDelete} ref={modalRef}>
        {deleteModalContent}
      </ConfirmModal>
    </>
  );
};

export default observer(ClipboardComponent);
