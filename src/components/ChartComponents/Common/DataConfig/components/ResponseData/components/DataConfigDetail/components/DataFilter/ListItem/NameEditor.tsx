import { EditFilled } from '@ant-design/icons';
import { Button, Input, App } from 'antd';
import { useCallback, useState } from 'react';
import styles from './index.less';

const NameEditor = (props: {
  value: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) => {
  const { value, onChange, onFocus, onBlur: propsOnBlur } = props;
  const [inputValue, setInputValue] = useState<string>(value);
  const [editable, setEditable] = useState<boolean>(false);

  const { message } = App.useApp();

  const onInputChange = useCallback((e: any) => {
    const value = e.target.value;
    setInputValue(value);
  }, []);

  const onConfirm = useCallback(() => {
    if (!inputValue.trim().length) {
      message.info('名称不能为空');
      return;
    }
    onChange?.(inputValue || value);
    setEditable(false);
    propsOnBlur?.();
  }, [onChange, inputValue, value, propsOnBlur]);

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
        <>
          <Input
            value={inputValue}
            onChange={onInputChange}
            onBlur={onConfirm}
            onClick={stop}
            autoFocus
            onFocus={onFocus}
          />
        </>
      ) : (
        <>
          <div className="text-ellipsis" title={inputValue}>
            {inputValue}
          </div>
          <Button
            className="h-a"
            type="link"
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
