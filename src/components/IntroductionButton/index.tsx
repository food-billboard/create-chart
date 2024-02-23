import { SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { DEFAULT_THEME_COLOR_LIST } from '@/utils/Assist/Theme';
import FeedBackModal, { FeedBackRef } from './components/FeedBackModal';
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

  const feedBackRef = useRef<FeedBackRef>(null);

  const handleClick = useCallback((key, callback) => {
    // 问题反馈
    if (key === 'feedback' && GlobalConfig.IS_IMPROVE_BACKEND) {
      feedBackRef.current?.open();
    } else {
      callback();
    }
  }, []);

  const children = useMemo(() => {
    const list = BUTTON_LIST().filter((item) => item.visible);
    return new Array(Math.min(nextColorList.length, list.length))
      .fill(0)
      .map((_, index) => {
        const { key, visible = true, onClick, ...nextItem } = list[index];
        if ((typeof visible === 'function' && !visible) || !visible)
          return null;
        return (
          <FloatButton
            {...nextItem}
            onClick={handleClick.bind(null, key, onClick)}
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
    <>
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
      <FeedBackModal ref={feedBackRef} />
    </>
  );
};

export default IntroductionButton;
