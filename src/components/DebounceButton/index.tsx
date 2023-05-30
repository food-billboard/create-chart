import { useState, useCallback } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { useDebounceFn } from 'ahooks';

const LoadingButton = (props: ButtonProps & { wait?: number }) => {
  const { onClick: propsOnClick, wait = 100, ...nextProps } = props;

  const { run } = useDebounceFn(
    (e) => {
      propsOnClick?.(e);
    },
    { wait: 200 },
  );

  return <Button onClick={run} {...nextProps} />;
};

export default LoadingButton;
