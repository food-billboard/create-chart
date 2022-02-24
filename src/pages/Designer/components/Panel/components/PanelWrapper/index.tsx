import { useEffect, useState, useCallback, ReactNode, useMemo } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { useScroll } from 'ahooks';
import classnames from 'classnames';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { BackgroundConfigRender } from '@/components/DesignerBackground';
import { mergeWithoutArray, sleep } from '@/utils/tool';
import ClipboardComponent from '../Clipboard';
import AbsorbGuideLine from './components/AbsorbGuideLine';
import Ruler from './components/Ruler';
import { mapStateToProps, mapDispatchToProps } from './connect';
import { wrapperId, subWrapperId } from './constants';
import styles from './index.less';

const RIGHT_BOTTOM_PADDING = 200;

const GuideLineButton = (props: { show: boolean; onClick?: any }) => {
  const { show, onClick } = props;

  const { left, top } = useScroll(document.querySelector(`#${wrapperId}`)) || {
    left: 0,
    top: 0,
  };

  const guideLineShowIcon = useMemo(() => {
    return show ? <EyeOutlined /> : <EyeInvisibleOutlined />;
  }, [show]);

  return (
    <Button
      onClick={onClick}
      type="link"
      className={classnames('pos-ab', styles['designer-page-main-guide-btn'])}
      style={{
        left,
        top,
      }}
      icon={guideLineShowIcon}
    ></Button>
  );
};

const PanelWrapper = (props: {
  scale: number;
  width?: number;
  height?: number;
  children: ReactNode;
  guideLineList?: ComponentData.TGuideLineConfigItem[];
  guideLineShow?: boolean;
  setGuideLine?: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const {
    scale: originScale,
    width = 0,
    height = 0,
    children,
    guideLineList = [],
    guideLineShow,
    setGuideLine,
  } = props;

  const [size, setSize] = useState({ width: 0, height: 0 });

  const scale = useMemo(() => {
    return originScale / 100;
  }, [originScale]);

  const wrapperSetGuideLine = useCallback(
    (value: Partial<ComponentData.TGuideLineConfig>) => {
      const newValue = mergeWithoutArray(
        {},
        {
          show: guideLineShow,
          value: guideLineList,
        },
        value,
      ) as ComponentData.TGuideLineConfig;

      setGuideLine?.(newValue);
    },
    [setGuideLine, guideLineList, guideLineShow],
  );

  const resize = useCallback(() => {
    const dom = document.querySelector(`#${wrapperId}`);
    if (!dom) return;
    let dw = dom.clientWidth;
    let dh = dom.clientHeight;
    let pw = width * scale + RIGHT_BOTTOM_PADDING;
    let ph = height * scale + RIGHT_BOTTOM_PADDING;
    const newWidth = Math.max(dw, pw);
    const newHeight = Math.max(dh, ph);
    setSize({ width: newWidth, height: newHeight });
  }, [height, width, scale]);

  useEffect(() => {
    sleep(100).then(resize);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return (
    <div
      className={classnames(
        styles['designer-page-main'],
        'box-sizing-border',
        'pos-re',
      )}
    >
      {/* background */}
      <BackgroundConfigRender />
      <div id={wrapperId} className="w-100 h-100 pos-re">
        <div
          id={subWrapperId}
          className={classnames(styles['designer-page-main-sub'], 'pos-re')}
          // style={size}
        >
          <Ruler
            size={size}
            wrapperSetGuideLine={wrapperSetGuideLine}
            scale={scale}
          />
          <GuideLineButton
            onClick={wrapperSetGuideLine.bind(null, { show: !guideLineShow })}
            show={!!guideLineShow}
          ></GuideLineButton>

          <AbsorbGuideLine size={size} />
          <ClipboardComponent>{children}</ClipboardComponent>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelWrapper);
