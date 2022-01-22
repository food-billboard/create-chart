import { useCallback, useMemo } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

const LockEditor = (props: {
  lock: boolean;
  onChange: (value: SuperPartial<ComponentData.TComponentData>) => void;
}) => {
  const { lock, onChange } = props;

  const changeLock = useCallback(
    (e) => {
      e.stopPropagation();

      onChange({
        config: {
          attr: {
            lock: !lock,
          },
        },
      });
    },
    [lock, onChange],
  );

  // 锁定
  const baseLock = useMemo(() => {
    return lock ? (
      <LockOutlined onClick={changeLock} className="c-po" />
    ) : (
      <UnlockOutlined onClick={changeLock} className="c-po" />
    );
  }, [lock, changeLock]);

  return baseLock;
};

export default LockEditor;
