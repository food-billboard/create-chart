/* eslint react/prop-types: 0 */
import * as React from 'react';
import classNames from 'classnames';
import { Status, Icons } from './interface';
import { StepIconRender, ProgressDotRender } from './Steps';

function isString(str: any): str is string {
  return typeof str === 'string';
}

export interface StepProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  iconPrefix?: string;
  active?: boolean;
  disabled?: boolean;
  stepIndex?: number;
  stepNumber?: number;
  status?: Status;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  tailContent?: React.ReactNode;
  icon?: React.ReactNode;
  icons?: Icons;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onStepClick?: (index: number) => void;
  progressDot?: ProgressDotRender | boolean;
  stepIcon?: StepIconRender;
  size?: number;
  direction?: 'vertical' | 'horizontal';
}

export default class Step extends React.Component<StepProps> {
  onClick: React.MouseEventHandler<HTMLDivElement> = (...args) => {
    const { onClick, onStepClick, stepIndex = 0 } = this.props;
    if (onClick) {
      onClick(...args);
    }

    onStepClick?.(stepIndex);
  };

  renderIconNode() {
    const {
      prefixCls,
      progressDot,
      stepIcon,
      stepNumber = 0,
      status = 'wait',
      title,
      description,
      icon,
      iconPrefix,
      icons,
    } = this.props;
    let iconNode;
    const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
      [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
      [`${iconPrefix}icon-check`]:
        !icon && status === 'finish' && ((icons && !icons.finish) || !icons),
      [`${iconPrefix}icon-cross`]:
        !icon && status === 'error' && ((icons && !icons.error) || !icons),
    });
    const iconDot = <span className={`${prefixCls}-icon-dot`} />;
    // `progressDot` enjoy the highest priority
    if (progressDot) {
      if (typeof progressDot === 'function') {
        iconNode = (
          <span className={`${prefixCls}-icon`}>
            {progressDot(iconDot, {
              index: stepNumber - 1,
              status,
              title,
              description,
            })}
          </span>
        );
      } else {
        iconNode = <span className={`${prefixCls}-icon`}>{iconDot}</span>;
      }
    } else if (icon && !isString(icon)) {
      iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
    } else if (icons && icons.finish && status === 'finish') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.finish}</span>;
    } else if (icons && icons.error && status === 'error') {
      iconNode = <span className={`${prefixCls}-icon`}>{icons.error}</span>;
    } else if (icon || status === 'finish' || status === 'error') {
      iconNode = <span className={iconClassName} />;
    } else {
      iconNode = <span className={`${prefixCls}-icon`}>{stepNumber}</span>;
    }

    if (stepIcon) {
      iconNode = stepIcon({
        index: stepNumber - 1,
        status,
        title,
        description,
        node: iconNode,
      });
    }

    return iconNode;
  }

  get tailContentStyle() {
    const { size = 24, direction } = this.props;
    if (direction === 'vertical')
      return {
        left: size / 2 - 1,
        padding: `${size + 6}px 0 4px 0`,
      };
    return {
      top: size / 2,
      marginLeft: size / 2 + 36,
      padding: `0 ${size / 2 + 12}px`,
    };
  }

  get contentStyle() {
    const { size = 24, direction } = this.props;
    if (direction === 'vertical')
      return {
        minHeight: size * 2,
      };
    return {
      width: 72 + size,
    };
  }

  render() {
    const {
      className,
      prefixCls,
      style,
      active,
      status = 'wait',
      iconPrefix,
      icon,
      wrapperStyle,
      stepNumber,
      disabled,
      description,
      title,
      subTitle,
      progressDot,
      stepIcon,
      tailContent,
      icons,
      stepIndex,
      onStepClick,
      onClick,
      size = 24,
      ...restProps
    } = this.props;

    const classString = classNames(
      `${prefixCls}-item`,
      `${prefixCls}-item-${status}`,
      className,
      {
        [`${prefixCls}-item-custom`]: icon,
        [`${prefixCls}-item-active`]: active,
        [`${prefixCls}-item-disabled`]: disabled === true,
      },
    );
    const stepItemStyle = { ...style };

    const accessibilityProps: {
      role?: string;
      tabIndex?: number;
      onClick?: React.MouseEventHandler<HTMLDivElement>;
    } = {};
    if (onStepClick && !disabled) {
      accessibilityProps.role = 'button';
      accessibilityProps.tabIndex = 0;
      accessibilityProps.onClick = this.onClick;
    }

    return (
      <div {...restProps} className={classString} style={stepItemStyle}>
        <div
          onClick={onClick}
          {...accessibilityProps}
          className={`${prefixCls}-item-container`}
        >
          <div
            className={`${prefixCls}-item-tail`}
            style={this.tailContentStyle}
          >
            {tailContent}
          </div>
          <div className={`${prefixCls}-item-icon`}>
            {this.renderIconNode()}
          </div>
          <div
            className={`${prefixCls}-item-content`}
            style={this.contentStyle}
          >
            <div className={`${prefixCls}-item-title`}>
              {title}
              {subTitle && (
                <div
                  title={typeof subTitle === 'string' ? subTitle : undefined}
                  className={`${prefixCls}-item-subtitle`}
                >
                  {subTitle}
                </div>
              )}
            </div>
            {description && (
              <div className={`${prefixCls}-item-description`}>
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
