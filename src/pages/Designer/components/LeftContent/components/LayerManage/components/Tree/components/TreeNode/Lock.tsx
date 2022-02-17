import { useCallback, useMemo } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import classnames from 'classnames';

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
      <LockOutlined
        style={{ cursor: 'pointer' }}
        onClick={changeLock}
        className={classnames('c-po')}
      />
    ) : (
      <UnlockOutlined
        style={{ cursor: 'pointer' }}
        onClick={changeLock}
        className={classnames('c-po')}
      />
    );
  }, [lock, changeLock]);

  return baseLock;
};

export default LockEditor;
