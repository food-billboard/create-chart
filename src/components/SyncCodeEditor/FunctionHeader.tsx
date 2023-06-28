import {} from 'react';
import { usePrimaryColor } from '@/hooks';
import Tooltip from '../Tooltip';

const FunctionHeader = (props: { functionName: string }) => {
  const { functionName } = props;
  const color = usePrimaryColor();

  return (
    <p>
      function{' '}
      <Tooltip
        title={`全局属性都会被放在第二参数 "global" 中，对于在上面被选择的属性，会响应式的更新此函数，如果不希望响应式，可不在上面选择，直接在函数中使用`}
      >
        <span className="c-po" style={{ color }}>
          {functionName}
        </span>
      </Tooltip>
      ( data, global, options ) {'{'}
    </p>
  );
};

export default FunctionHeader;
