import { ReactNode, useEffect } from 'react';

const KeyActionComponent = (props: {
  children?: ReactNode;
  onChange?: (value: boolean) => void;
}) => {
  const { children, onChange } = props;

  const onKeyUp = (e: any) => {
    if (e.key?.toLowerCase() === 'alt') {
      onChange?.(false);
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key?.toLowerCase() === 'alt') {
      onChange?.(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return <>{children}</>;
};

export default KeyActionComponent;
