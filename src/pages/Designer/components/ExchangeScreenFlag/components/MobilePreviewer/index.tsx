import {
  forwardRef,
  useImperativeHandle,
  useState,
  createContext,
} from 'react';
import { Drawer } from 'antd';
import { NormalPainter } from '../../../Panel/components/Painter';
import { ExchangePreviewerContext } from './context';

export type MobilePreviewerRef = {
  open: () => void;
};

const MobilePreviewer = forwardRef<MobilePreviewerRef, {}>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
      };
    },
    [],
  );

  return (
    <Drawer
      open={visible}
      title="移动端转换"
      onClose={setVisible.bind(null, false)}
      placement="left"
    >
      <ExchangePreviewerContext.Provider
        value={{
          flag: 'H5',
          mobilePreviewerAble: true,
        }}
      >
        <NormalPainter />
      </ExchangePreviewerContext.Provider>
    </Drawer>
  );
});

export default MobilePreviewer;
