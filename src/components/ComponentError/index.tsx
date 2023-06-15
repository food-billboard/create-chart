import { ReactNode, useMemo, useRef } from 'react';
import { useSize } from 'ahooks';
import classnames from 'classnames';
import styles from './index.less';

const ComponentError = (props: {
  title?: ReactNode;
  extra?: ReactNode;
  icon?: ReactNode;
}) => {
  const { icon, title = '组件加载错误', extra } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { width = 0 } = useSize(ref) || {};

  const fontSize = useMemo(() => {
    if (width < 200) return 20;
    if (width < 400) return 40;
    return 50;
  }, [width]);

  return (
    <div
      ref={ref}
      className={classnames(
        'w-100 h-100 over-hide dis-flex',
        styles['component-error'],
      )}
    >
      <div
        className="component-error-icon normal-color"
        style={{ fontSize: `${fontSize}px` }}
      >
        {icon || (
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="exclamation-circle"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
          </svg>
        )}
      </div>
      <span
        className="component-error-title"
        style={{ fontSize: `${fontSize * 0.6}px` }}
      >
        {title}
      </span>
      {extra}
    </div>
  );
};

export default ComponentError;
