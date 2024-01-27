import { SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useColorThemeList } from '@/hooks';
import { BUTTON_LIST } from './constants';
import styles from './index.less';
import useDrag from './useDrag';

const commonStyle = {};

const IntroductionButton = () => {
  const [buttonOpen, setButtonOpen] = useState(false);

  const [primaryColor, ...nextColorList] = useColorThemeList();

  const { isDragging, ...dragProps } = useDrag({
    right: 24,
    bottom: 80,
  });

  const children = useMemo(() => {
    return new Array(Math.min(nextColorList.length, BUTTON_LIST.length))
      .fill(0)
      .map((_, index) => {
        return (
          <FloatButton
            {...BUTTON_LIST[index]}
            style={{
              backgroundColor: nextColorList[index],
              ...commonStyle,
            }}
            key={BUTTON_LIST[index].key}
          />
        );
      });
  }, [nextColorList]);

  useEffect(() => {
    if (!isDragging) setButtonOpen(false);
  }, [isDragging]);

  return (
    <FloatButton.Group
      {...dragProps}
      trigger="hover"
      type="primary"
      style={{
        ...dragProps.style,
        // @ts-ignore
        '--float-button-color': primaryColor,
      }}
      icon={<SmileOutlined />}
      className={styles['introduction-button']}
      open={isDragging ? false : buttonOpen}
      onOpenChange={setButtonOpen}
    >
      {children}
    </FloatButton.Group>
  );
};

export default IntroductionButton;
