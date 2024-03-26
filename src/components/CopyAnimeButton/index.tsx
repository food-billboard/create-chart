import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { useCallback, useState } from 'react';

const CopyAnimeButton = (props: ButtonProps) => {
  const [copyComplete, setCopyComplete] = useState(true);

  const { onClick: propsOnClick, ...nextProps } = props;

  const onClick = useCallback(
    (e) => {
      if (!copyComplete) return;
      propsOnClick?.(e);
      setCopyComplete(false);
      setTimeout(() => {
        setCopyComplete(true);
      }, 2000);
    },
    [propsOnClick, copyComplete],
  );

  return (
    <Button
      {...nextProps}
      type="link"
      onClick={onClick}
      icon={copyComplete ? <CopyOutlined /> : <CheckOutlined />}
    />
  );
};

export default CopyAnimeButton;
