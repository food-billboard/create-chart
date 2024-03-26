import { Button, ConfigProvider } from 'antd';
import { ReactNode, useCallback, CSSProperties } from 'react';
import { ChildrenType } from './type';

const useChildren = (
  childrenType: ChildrenType,
  options: {
    title: ReactNode;
    icon: ReactNode;
    key: string;
    onClick?: (e: any) => void;
    disabled?: boolean;
    checked?: boolean;
    style?: CSSProperties;
    className?: string;
  },
) => {
  const { icon, title, disabled, onClick, key, style, className, checked } =
    options;

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (disabled) return;
      onClick?.(e);
    },
    [disabled, onClick],
  );

  if (!childrenType || childrenType === 'menu') {
    return (
      <div key={key} onClick={handleClick} style={style} className={className}>
        {icon}
        <span className="m-l-4">{title}</span>
      </div>
    );
  }

  if (childrenType === 'button') {
    return (
      <ConfigProvider
        theme={{
          components: {
            Button: {
              textHoverBg: 'var(--primary-color)',
            },
          },
        }}
      >
        <Button
          icon={icon}
          {...(typeof title === 'string' ? { title } : {})}
          type={checked ? 'primary' : 'text'}
          onClick={handleClick}
          disabled={disabled}
          style={style}
          className={className}
        />
      </ConfigProvider>
    );
  }

  return null;
};

export default useChildren;
