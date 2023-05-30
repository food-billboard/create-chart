import { useState, useCallback } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

const LoadingButton = (
  props: ButtonProps & {
    onClick: (e: any) => Promise<any>;
  },
) => {
  const [stateLoading, setStateLoading] = useState(!!props.loading);

  const { onClick: propsOnClick, loading, ...nextProps } = props;

  const onClick = useCallback(async (e) => {
    setStateLoading(true);
    propsOnClick?.(e)
      .catch(() => {})
      .then(() => {
        setStateLoading(false);
      });
  }, []);

  return <Button loading={stateLoading} onClick={onClick} {...nextProps} />;
};

export default LoadingButton;
