import { SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME_COLOR_LIST } from '@/utils/Assist/Theme';
import { BUTTON_LIST } from './constants';
import styles from './index.less';
import useDrag from './useDrag';

const commonStyle = {};

const IntroductionButton = () => {
  const [buttonOpen, setButtonOpen] = useState(false);

  const [primaryColor, ...nextColorList] = DEFAULT_THEME_COLOR_LIST;

  const { isDragging, ...dragProps } = useDrag({
    right: 24,
    bottom: 80,
  });

  const handleClick = useCallback((key) => {
    // TODO
  }, []);

  const children = useMemo(() => {
    const list = BUTTON_LIST().filter((item) => item.visible);
    return new Array(Math.min(nextColorList.length, list.length))
      .fill(0)
      .map((_, index) => {
        const { key, visible = true, ...nextItem } = list[index];
        if ((typeof visible === 'function' && !visible) || !visible)
          return null;
        return (
          <FloatButton
            onClick={handleClick.bind(null, key)}
            {...nextItem}
            style={{
              backgroundColor: nextColorList[index],
              ...commonStyle,
            }}
            key={key}
          />
        );
      });
  }, [nextColorList, handleClick]);

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
