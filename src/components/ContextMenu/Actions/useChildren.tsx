import { ReactNode, useCallback, CSSProperties } from 'react';
import { Button } from 'antd';
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
      <Button
        icon={icon}
        {...(typeof title === 'string' ? { title } : {})}
        type={checked ? 'primary' : 'link'}
        onClick={handleClick}
        disabled={disabled}
        style={style}
        className={className}
      />
    );
  }

  return null;
};

export default useChildren;
