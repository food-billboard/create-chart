import { FileImageOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { useCallback, useRef } from 'react';
import BackgroundRender from './components/BackgroundRender';
import BackgroundSelect, {
  BackgroundSelectRef,
} from './components/BackgroundSelect';
import styles from './index.less';

export { default as BackgroundMap } from './components/Background';
export { default as BackgroundRender } from './components/BackgroundRender';
export { default as BackgroundSelect } from './components/BackgroundSelect';

export const InternalBackgroundSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const [value, onChange] = useControllableValue(props);

  const selectRef = useRef<BackgroundSelectRef>(null);

  const handleSelect = useCallback(() => {
    selectRef.current?.open();
  }, []);

  return (
    <>
      <BackgroundRender
        value={value || ''}
        onClick={handleSelect}
        thumb
        className={styles['internal-background-button']}
      >
        <div className={styles['internal-background-button-mask']}>
          <FileImageOutlined />
          <div style={{ marginTop: 8 }}>点击这里进行更改</div>
        </div>
      </BackgroundRender>
      <BackgroundSelect
        value={value}
        onChange={onChange}
        mode="select"
        ref={selectRef}
      />
    </>
  );
};
