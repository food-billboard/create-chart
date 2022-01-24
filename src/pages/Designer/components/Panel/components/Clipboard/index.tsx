import { ReactNode, useRef } from 'react';
import { connect } from 'dva';
import { useFocusWithin, useKeyPress } from 'ahooks';
import { get } from 'lodash';
import { useIdPathMap } from '@/hooks/useComponentsPath';
import { createComponent } from '@/utils/Assist/Component';
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

  const ref = useRef<HTMLDivElement>(null);

  const isFocusWithin = useFocusWithin(ref);

  // copy
  useKeyPress('ctrl.c', () => {
    if (!isFocusWithin) return;
    setClipboard(select);
  });

  // paste
  useKeyPress('ctrl.v', () => {
    if (!isFocusWithin) return;
    const idPathMap = useIdPathMap();
    const newSelect: string[] = [];

    const newComponents = [
      ...components,
      ...clipboard.reduce<ComponentData.TComponentData[]>((acc, cur) => {
        const targetPath = idPathMap[cur];
        if (!targetPath) return acc;
        const component = get(components, targetPath.path);
        if (!component) return acc;
        const newComponents = createComponent(component);
        newSelect.push(newComponents.id);
        acc.push(newComponents);
        return acc;
      }, []),
    ];

    setComponentAll(newComponents);
    setSelect(newSelect);
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

  return (
    <div ref={ref}>
      {children}
      <label style={{ display: 'block' }}>
        First Name: <input />
      </label>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ClipboardComponent);
