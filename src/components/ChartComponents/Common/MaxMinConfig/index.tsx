import { ReactNode } from 'react';
import CenterPositionConfig from '../CenterPositionConfig';

const MaxMinConfig = (props: {
  value: {
    max: number;
    min: number;
  };
  onChange: (value: { max: number; min: number }) => void;
  label?: ReactNode;
  subLabel?: [ReactNode, ReactNode];
}) => {
  const { value, onChange, label, subLabel } = props;

  return (
    <CenterPositionConfig
      value={{
        left: value.min,
        top: value.max,
      }}
      onChange={(value) => {
        onChange({
          min: value.left,
          max: value.top,
        });
      }}
      parentLabel={label || '大小'}
      subLabel={subLabel || ['最小', '最大']}
    />
  );
};

export default MaxMinConfig;
