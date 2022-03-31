import { useCallback, useState } from 'react';
import { Button, Input, message } from 'antd';
import { EditFilled } from '@ant-design/icons';
import styles from './index.less';

const NameEditor = (props: {
  value: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isHover: boolean;
}) => {
  const { value, isHover, onChange, onFocus, onBlur } = props;
  const [inputValue, setInputValue] = useState<string>(value);
  const [editable, setEditable] = useState<boolean>(false);

  const onInputChange = useCallback((e: any) => {
    const value = e.target.value;
    setInputValue(value);
  }, []);

  const onConfirm = useCallback(() => {
    if (!inputValue.trim().length) {
      message.info('名称不能为空');
      setInputValue(value);
      return;
    }
    onChange?.(inputValue || value);
    setEditable(false);
    onBlur?.();
  }, [onChange, inputValue, value]);

  const stop = (e: any) => {
    e.stopPropagation();
  };

  const wrapperClick = useCallback(
    (e: any) => {
      stop(e);
    },
    [editable],
  );

  return (
    <div
      className={styles['design-config-data-filter-list-item-header-name']}
      onClick={wrapperClick}
    >
      {editable ? (
        <Input
          value={inputValue}
          onChange={onInputChange}
          onBlur={onConfirm}
          onClick={stop}
          autoFocus
          onFocus={onFocus}
        />
      ) : (
        <>
          <div className="text-ellipsis" title={inputValue}>
            {inputValue}
          </div>
          <Button
            className="h-a"
            type="link"
            style={{
              visibility: isHover ? 'visible' : 'hidden',
            }}
            icon={<EditFilled />}
            onClick={(e) => {
              stop(e);
              setEditable(true);
            }}
          ></Button>
        </>
      )}
    </div>
  );
};

export default NameEditor;
