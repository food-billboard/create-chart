import { useCallback, useMemo, CSSProperties } from 'react';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import classnames from 'classnames';

const LockEditor = (props: {
  lock: boolean;
  onChange: (value: SuperPartial<ComponentData.TComponentData>) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}) => {
  const { lock, onChange, className, style, disabled } = props;

  const changeLock = useCallback(
    (e) => {
      e.stopPropagation();

      if (disabled) return;
      onChange({
        config: {
          attr: {
            lock: !lock,
          },
        },
      });
    },
    [lock, onChange, disabled],
  );

  // 锁定
  const baseLock = useMemo(() => {
    return lock ? (
      <LockOutlined
        style={{ cursor: 'pointer', opacity: !!disabled ? 0.7 : 1, ...style }}
        onClick={changeLock}
        className={classnames('c-po', className)}
      />
    ) : (
      <UnlockOutlined
        style={{ cursor: 'pointer', opacity: !!disabled ? 0.7 : 1, ...style }}
        onClick={changeLock}
        className={classnames('c-po', className)}
      />
    );
  }, [lock, changeLock, style, className, disabled]);

  return baseLock;
};

export default LockEditor;
