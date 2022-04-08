import { Component, CSSProperties } from 'react';
import { merge, throttle } from 'lodash';
import classnames from 'classnames';
import ThemeUtil from '@/utils/Assist/Theme';
import { GUIDE_LINE_PADDING } from '@/utils/constants';
import ColorSelect from '../ColorSelect';
import styles from './index.less';

const { getRgbaString } = ColorSelect;
class GuideLine extends Component<
  {
    disabled?: boolean;
    style?: CSSProperties;
    className?: string;
    onChange?: (params: ComponentData.TGuideLineConfigItem) => void;
    onMouseUp?: () => void;
    onMouseDown?: () => void;
    onMouseMove?: () => void;
    onDoubleClick?: () => void;
    lineStyle?: 'dashed' | 'solid';
    scale: number;
  } & ComponentData.TGuideLineConfigItem
> {
  flag = false;
  times = 0;
  startX = 0;
  startY = 0;

  onMouseDown = (e: any) => {
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
  };

  onMouseMove = (e: any) => {
    const {
      disabled,
      style,
      onChange,
      type,
      id,
      lineStyle,
      onMouseMove,
      scale,
    } = this.props;
    if (!this.flag || disabled) return;
    if (this.times <= 5) {
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
      const newItem: ComponentData.TGuideLineConfigItem = {
        style: merge({}, style, changeStyle),
        type,
        id,
        lineStyle,
      };
      onChange?.(newItem);
      onMouseMove?.();
    } catch (e) {}
  };

  throttleOnMouseMove = throttle(this.onMouseMove, 30);

  onMouseUp = () => {
    const { disabled, onMouseUp } = this.props;
    if (!this.flag || disabled) return;
    this.flag = false;
    this.times = 0;
    document.removeEventListener('mousemove', this.throttleOnMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    onMouseUp?.();
  };

  onDoubleClick = (e: any) => {
    e.stopPropagation();
    this.props.onDoubleClick?.();
  };

  get guideLineStyle() {
    const { style, type, scale } = this.props;
    if (type === 'vertical') {
      return {
        ...style,
        left: style?.left * scale || 0,
        padding: `0 ${GUIDE_LINE_PADDING}px`,
      };
    }
    return {
      ...style,
      top: style?.top * scale || 0,
      padding: `${GUIDE_LINE_PADDING}px 0`,
    };
  }

  render() {
    const { type, lineStyle = 'dashed', className } = this.props;

    return (
      <div
        className={classnames(
          styles[`ruler-guide-line-wrapper-${type}`],
          className,
        )}
        style={this.guideLineStyle}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      >
        <div
          className={styles[`ruler-guide-line-${type}`]}
          style={{
            borderStyle: lineStyle,
            borderColor: getRgbaString(
              ThemeUtil.generateNextColor4CurrentTheme(0),
            ),
          }}
        ></div>
      </div>
    );
  }
}

export default GuideLine;
