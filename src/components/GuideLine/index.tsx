import { Component, CSSProperties } from 'react';
import { merge } from 'lodash';
import styles from './index.less';

class GuideLine extends Component<
  {
    disabled?: boolean;
    style?: CSSProperties;
    onChange?: (params: ComponentData.TGuideLineConfigItem) => void;
    onMouseUp?: () => void;
    onMouseDown?: () => void;
    onMouseMove?: () => void;
    onDoubleClick?: () => void;
    lineStyle?: 'dashed' | 'solid';
  } & ComponentData.TGuideLineConfigItem
> {
  flag = false;
  times = 0;
  startX = 0;
  startY = 0;

  onMouseDown = (e: any) => {
    const { disabled } = this.props;
    if (disabled) return;
    this.flag = true;
    this.times = 0;
    try {
      var evt = window.event || e;
      var scrollTop = 0; //document.body.scrollTop || document.documentElement.scrollTop
      var scrollLeft = 0; //document.body.scrollLeft || document.documentElement.scrollLeft
      this.startX = evt.clientX + scrollLeft;
      this.startY = evt.clientY + scrollTop;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } catch (e) {}
  };

  onMouseMove = (e: any) => {
    const { disabled, style, onChange, type, id, lineStyle } = this.props;
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
        changeStyle.top = top + evt.clientY - this.startY;
        this.startY = evt.clientY;
      } else {
        changeStyle.left = left + evt.clientX - this.startX;
        this.startX = evt.clientX;
      }
      const newItem: ComponentData.TGuideLineConfigItem = {
        style: merge({}, style, changeStyle),
        type,
        id,
        lineStyle,
      };
      onChange?.(newItem);
    } catch (e) {
      console.log(e);
    }
  };

  onMouseUp = () => {
    const { disabled, onMouseUp } = this.props;
    if (!this.flag || disabled) return;
    this.flag = false;
    this.times = 0;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    onMouseUp?.();
  };

  onDoubleClick = (e: any) => {
    e.stopPropagation();
    this.props.onDoubleClick?.();
  };

  render() {
    const { style, type, lineStyle = 'dashed' } = this.props;

    return (
      <div
        className={styles[`ruler-guide-line-wrapper-${type}`]}
        style={merge({}, style)}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      >
        <div
          className={styles[`ruler-guide-line-${type}`]}
          style={{
            borderStyle: lineStyle,
          }}
        ></div>
      </div>
    );
  }
}

export default GuideLine;
