import { useMemo, useRef, useState, useEffect, cloneElement } from 'react';
import { uniqueId, merge } from 'lodash';
import { DatePicker as AntDatePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';
import { useComponent } from '@/components/ChartComponents/Common/Component/hook';
import ColorSelect from '@/components/ColorSelect';
import { TDatePickerConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const { WeekPicker, YearPicker, MonthPicker } = AntDatePicker;

const CHART_ID = 'DATE_PICKER';

const DatePicker = (
  props: ComponentData.CommonComponentProps<TDatePickerConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const {
    defaultDate,
    mode,
    format,
    filterDate,
    filterTime,
    arrow,
    yearAndMonthAndTime,
    week,
    dateAndTime,
    confirmBtn,
    input,
  } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const [dateValue, setDateValue] = useState<moment.Moment>(
    moment(defaultDate),
  );

  const { syncInteractiveAction } = useComponent<TDatePickerConfig>(
    {
      component: value,
      global,
    },
    {
      current: {},
    } as any,
  );

  const onChange = (value: any) => {
    setDateValue(value);
    syncInteractiveAction('change', {
      value,
    });
  };

  const filterDateFunction = useMemo(() => {
    return new Function('data', filterDate);
  }, [filterDate]);

  const filterTimeFunction = useMemo(() => {
    return new Function('data', filterTime);
  }, [filterTime]);

  const DatePickerDom: any = useMemo(() => {
    const prefix = 'component-interactive-date-picker';
    const className = `${prefix}-${mode}`;
    const commonProps: any = {
      className: classnames('w-100'),
      style: {
        [`--${prefix}-input-font-size`]: input.textStyle.fontSize + 'px',
        [`--${prefix}-input-font-weight`]: input.textStyle.fontWeight,
        [`--${prefix}-input-font-family`]: input.textStyle.fontFamily,
        [`--${prefix}-input-color`]: getRgbaString(input.textStyle.color),
        [`--${prefix}-input-border-color`]: getRgbaString(input.borderColor),
        [`--${prefix}-input-active-border-color`]: getRgbaString(
          input.activeBorderColor,
        ),
      },
      value: dateValue,
      format,
      onChange,
      disabledDate: filterDateFunction,
      disabledTime: filterTimeFunction,
      popupClassName: classnames(styles[className]),
      panelRender: (node: any) => {
        return cloneElement(node, {
          style: {
            [`--${prefix}-arrow-color`]: getRgbaString(arrow.color),
            [`--${prefix}-arrow-color-active`]: getRgbaString(
              arrow.active.color,
            ),

            [`--${prefix}-header-font-size`]:
              yearAndMonthAndTime.textStyle.fontSize + 'px',
            [`--${prefix}-header-font-weight`]:
              yearAndMonthAndTime.textStyle.fontWeight,
            [`--${prefix}-header-font-family`]:
              yearAndMonthAndTime.textStyle.fontFamily,
            [`--${prefix}-header-color`]: getRgbaString(
              yearAndMonthAndTime.textStyle.color,
            ),

            [`--${prefix}-week-font-size`]: week.textStyle.fontSize + 'px',
            [`--${prefix}-week-font-weight`]: week.textStyle.fontWeight,
            [`--${prefix}-week-font-family`]: week.textStyle.fontFamily,
            [`--${prefix}-week-color`]: getRgbaString(week.textStyle.color),

            [`--${prefix}-date-border-radius`]: dateAndTime.borderRadius + 'px',

            [`--${prefix}-date-font-size`]:
              dateAndTime.textStyle.fontSize + 'px',
            [`--${prefix}-date-font-weight`]: dateAndTime.textStyle.fontWeight,
            [`--${prefix}-date-font-family`]: dateAndTime.textStyle.fontFamily,
            [`--${prefix}-date-color`]: getRgbaString(
              dateAndTime.textStyle.color,
            ),
            [`--${prefix}-date-background-color`]: getRgbaString(
              dateAndTime.backgroundColor,
            ),

            [`--${prefix}-date-hover-font-size`]:
              dateAndTime.hover.textStyle.fontSize + 'px',
            [`--${prefix}-date-hover-font-weight`]:
              dateAndTime.hover.textStyle.fontWeight,
            [`--${prefix}-date-hover-font-family`]:
              dateAndTime.hover.textStyle.fontFamily,
            [`--${prefix}-date-hover-color`]: getRgbaString(
              dateAndTime.hover.textStyle.color,
            ),
            [`--${prefix}-date-hover-background-color`]: getRgbaString(
              dateAndTime.hover.backgroundColor,
            ),

            [`--${prefix}-date-active-font-size`]:
              dateAndTime.active.textStyle.fontSize + 'px',
            [`--${prefix}-date-active-font-weight`]:
              dateAndTime.active.textStyle.fontWeight,
            [`--${prefix}-date-active-font-family`]:
              dateAndTime.active.textStyle.fontFamily,
            [`--${prefix}-date-active-color`]: getRgbaString(
              dateAndTime.active.textStyle.color,
            ),
            [`--${prefix}-date-active-background-color`]: getRgbaString(
              dateAndTime.active.backgroundColor,
            ),

            [`--${prefix}-date-disabled-font-size`]:
              dateAndTime.disabled.textStyle.fontSize + 'px',
            [`--${prefix}-date-disabled-font-weight`]:
              dateAndTime.disabled.textStyle.fontWeight,
            [`--${prefix}-date-disabled-font-family`]:
              dateAndTime.disabled.textStyle.fontFamily,
            [`--${prefix}-date-disabled-color`]: getRgbaString(
              dateAndTime.disabled.textStyle.color,
            ),
            [`--${prefix}-date-disabled-background-color`]: getRgbaString(
              dateAndTime.disabled.backgroundColor,
            ),

            [`--${prefix}-date-confirm-btn-font-size`]:
              confirmBtn.textStyle.fontSize + 'px',
            [`--${prefix}-date-confirm-btn-font-weight`]:
              confirmBtn.textStyle.fontWeight,
            [`--${prefix}-date-confirm-btn-font-family`]:
              confirmBtn.textStyle.fontFamily,
            [`--${prefix}-date-confirm-btn-color`]: getRgbaString(
              confirmBtn.textStyle.color,
            ),

            [`--${prefix}-date-next-prev-font-size`]:
              dateAndTime.prevAndNext.textStyle.fontSize + 'px',
            [`--${prefix}-date-next-prev-font-weight`]:
              dateAndTime.prevAndNext.textStyle.fontWeight,
            [`--${prefix}-date-next-prev-font-family`]:
              dateAndTime.prevAndNext.textStyle.fontFamily,
            [`--${prefix}-date-next-prev-color`]: getRgbaString(
              dateAndTime.prevAndNext.textStyle.color,
            ),
            [`--${prefix}-date-next-prev-background-color`]: getRgbaString(
              dateAndTime.prevAndNext.backgroundColor,
            ),
          },
        });
      },
    };
    switch (mode) {
      case 'date':
        // @ts-ignore
        return <AntDatePicker {...commonProps} />;
      case 'month':
        // @ts-ignore
        return <MonthPicker {...commonProps} />;
      case 'time':
        // @ts-ignore
        return <AntDatePicker showTime {...commonProps} />;
      case 'week':
        return (
          // @ts-ignore
          <WeekPicker
            {...commonProps}
            format={(value) => {
              return `${moment(value)
                .startOf('week')
                .format(format)} ~ ${moment(value)
                .endOf('week')
                .format(format)}`;
            }}
          />
        );
      case 'year':
        // @ts-ignore
        return <YearPicker {...commonProps} />;
    }
  }, [
    mode,
    dateValue,
    format,
    arrow,
    yearAndMonthAndTime,
    week,
    dateAndTime,
    filterTimeFunction,
    filterDateFunction,
    confirmBtn,
    input,
  ]);

  const componentClassName = useMemo(() => {
    return classnames(
      'dis-flex',
      className,
      styles['component-interactive-date-picker'],
    );
  }, [className]);

  useEffect(() => {
    setDateValue(moment(defaultDate));
  }, [defaultDate]);

  useEffect(() => {
    onChange(dateValue);
  }, []);

  return (
    <>
      <div
        className={componentClassName}
        style={merge(
          {
            width: '100%',
            height: '100%',
          },
          style,
        )}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
          {DatePickerDom}
        </Wrapper>
      </div>
    </>
  );
};

const WrapperDatePicker: typeof DatePicker & {
  id: ComponentData.TComponentSelfType;
} = DatePicker as any;

WrapperDatePicker.id = CHART_ID;

export default WrapperDatePicker;
