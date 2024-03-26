import type { SuperPartial } from 'chunk-file-upload';
import classnames from 'classnames';
import { merge, throttle } from 'lodash';
import { Component, CSSProperties } from 'react';
import { GUIDE_LINE_PADDING } from '@/utils/constants';
import styles from './index.less';
import AbsorbGuideLine from './utils';

type Props = {
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  onChange?: (params: ComponentData.TGuideLineConfigItem) => void;
  onCompleteChange?: (params: ComponentData.TGuideLineConfigItem) => void;
  onMouseUp?: () => void;
  onMouseDown?: () => void;
  onMouseMove?: () => void;
  onDoubleClick?: () => void;
  lineStyle?: 'dashed' | 'solid';
  scale: number;
  size: { width: number; height: number };
  isGuideLineSticky?: boolean;
} & ComponentData.TGuideLineConfigItem;
class GuideLine extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const { type, style, lineStyle, id } = props;
    this.AbsorbGuideLineUtil = new AbsorbGuideLine(
      {
        type,
        style,
        lineStyle,
        id,
      },
      () => this.props.scale,
      this.onChange,
    );
  }

  flag = false;
  times = 0;
  startX = 0;
  startY = 0;

  AbsorbGuideLineUtil;

  state = {
    style: {
      ...this.props.style,
    },
  };

  onChange = (value: SuperPartial<ComponentData.TGuideLineConfigItem>) => {
    const { style } = this.state;
    const { style: updateStyle } = value;
    const newStyle = merge({}, style, updateStyle);
    this.setState({
      style: newStyle,
    });
  };

  onMouseDown = (e: any) => {
    e?.stopPropagation();
    const { disabled, onMouseDown } = this.props;
    if (disabled) return;
    this.flag = true;
    this.times = 0;
    try {
      var evt = window.event || e;
      var scrollTop = 0; //document.body.scrollTop || document.documentElement.scrollTop
      var scrollLeft = 0; //document.body.scrollLeft || document.documentElement.scrollLeft
      this.startX = evt.clientX + scrollLeft;
      this.startY = evt.clientY + scrollTop;
      document.addEventListener('mousemove', this.throttleOnMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      onMouseDown?.();
    } catch (e) {}
    this.AbsorbGuideLineUtil.onMouseDown();
  };

  onMouseMove = (e: any) => {
    e?.stopPropagation();
    const { disabled, onChange, type, id, lineStyle, onMouseMove, scale } =
      this.props;
    const { style } = this.state;
    if (!this.flag || disabled) return;
    if (this.times <= 2) {
      this.times++;
      return;
    }
    try {
      var evt = window.event || e;
      const { left, top } = style;
      let changeStyle: Partial<ComponentData.TGuideLineConfigItem['style']> =
        {};
      if (type === 'horizontal') {
        const moveDistance = evt.clientY - this.startY;
        changeStyle.top = top + moveDistance / scale;
        this.startY = evt.clientY;
      } else {
        const moveDistance = evt.clientX - this.startX;
        changeStyle.left = left + moveDistance / scale;
        this.startX = evt.clientX;
      }

      const newStyle = {
        ...style,
        ...changeStyle,
      };
      const newItem: ComponentData.TGuideLineConfigItem = {
        style: {
          ...newStyle,
        },
        type,
        id,
        lineStyle,
      };
      onChange?.(newItem);
      this.setState({
        style: newStyle,
      });
      onMouseMove?.();
      this.AbsorbGuideLineUtil.onMouseMove(newStyle);
    } catch (e) {}
  };

  throttleOnMouseMove = throttle(this.onMouseMove, 30);

  onMouseUp = () => {
    const {
      disabled,
      onMouseUp,
      onCompleteChange,
      type,
      id,
      lineStyle,
      isGuideLineSticky,
    } = this.props;
    const { style } = this.state;
    if (!this.flag || disabled) return;
    this.flag = false;
    this.times = 0;
    document.removeEventListener('mousemove', this.throttleOnMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    onMouseUp?.();
    const newItem: ComponentData.TGuideLineConfigItem = {
      style,
      type,
      id,
      lineStyle,
    };
    this.AbsorbGuideLineUtil.onMouseUp(newItem).then((newItem) => {
      onCompleteChange?.(newItem);
    });
  };

  onDoubleClick = (e: any) => {
    e.stopPropagation();
    this.props.onDoubleClick?.();
  };

  get guideLineStyle() {
    const { type, scale, size } = this.props;
    const { style } = this.state;
    if (type === 'vertical') {
      return {
        ...style,
        height: size.height,
        left: (style?.left * scale || 0) + 30 - GUIDE_LINE_PADDING,
        padding: `0 ${GUIDE_LINE_PADDING}px`,
      };
    }
    return {
      ...style,
      width: size.width,
      // top: (style?.top * scale || 0) + 30 - GUIDE_LINE_PADDING,
      // 为了帮助辅助线对齐，多减掉一个padding
      top: (style?.top * scale || 0) + 30 - GUIDE_LINE_PADDING * 2,
      padding: `${GUIDE_LINE_PADDING}px 0`,
    };
  }

  render() {
    const { type, lineStyle = 'dashed', className } = this.props;
    const { style } = this.state;

    return (
      <div
        className={classnames(
          'ruler-guide-line',
          styles[`ruler-guide-line-wrapper-${type}`],
          className,
        )}
        style={this.guideLineStyle}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      >
        <div
          className={styles[`ruler-guide-line-flag-${type}`]}
          style={{
            backgroundColor: 'var(--primary-color)',
          }}
        >
          {Math.round(style.left ?? style.top) || 0}
          {/* {Math.round(((left ?? top) - 30 + GUIDE_LINE_PADDING) / scale) || 0} */}
        </div>
        <div
          className={styles[`ruler-guide-line-${type}`]}
          style={merge(
            {},
            {
              borderStyle: lineStyle,
              borderColor: 'var(--primary-color)',
            },
            type === 'horizontal'
              ? { top: GUIDE_LINE_PADDING * 2 }
              : { left: GUIDE_LINE_PADDING },
          )}
        ></div>
      </div>
    );
  }
}

export default GuideLine;
