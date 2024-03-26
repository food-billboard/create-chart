import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classnames from 'classnames';
import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';
import BackgroundMap from '../Background';
import styles from './index.less';

const BackgroundRender = ({
  value,
  style,
  className,
  onClick,
  thumb = false,
  children,
  editable = false,
}: {
  value: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  thumb?: boolean;
  editable?:
    | false
    | {
        onDelete?: () => void;
      };
  children?: ReactNode;
}) => {
  const { value: realValue, isInternal } = useMemo<{
    value: string | ReactNode;
    isInternal: boolean;
  }>(() => {
    const noPrefixValue = (value || '').replace('internal_background-', '');
    if (noPrefixValue.startsWith('http')) {
      return {
        value: noPrefixValue,
        isInternal: false,
      };
    } else {
      return {
        value:
          (BackgroundMap as any)[noPrefixValue]?.[thumb ? 'image' : 'value'] ||
          ('' as string | ReactNode),
        isInternal: !thumb,
      };
    }
  }, [value, thumb]);

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      editable && editable.onDelete?.();
    },
    [editable],
  );

  return (
    <div
      style={style}
      className={classnames(
        className,
        styles['internal-background-render'],
        'pos-re',
        {
          [styles['internal-background-render-editable']]: !!editable,
        },
      )}
      onClick={onClick}
    >
      {isInternal ? (
        realValue
      ) : (
        <img
          src={realValue as string}
          className={styles['internal-background-render-image']}
        />
      )}
      {children}
      {editable && (
        <div
          className={classnames(
            'pos-ab w-100 h-100 dis-flex-cen',
            styles['internal-background-render-form'],
          )}
        >
          <Button
            size="large"
            type="link"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          >
            删除
          </Button>
        </div>
      )}
    </div>
  );
};

export default BackgroundRender;
