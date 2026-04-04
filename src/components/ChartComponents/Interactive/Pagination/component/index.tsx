import { useUpdateEffect } from 'ahooks';
import { Pagination as AntPagination } from 'antd';
import type { PaginationProps } from 'antd';
import classnames from 'classnames';
import { uniqueId, merge } from 'lodash';
import { useMemo, useRef, useState, useEffect, CSSProperties } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TPaginationConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Pagination = (
  props: ComponentData.CommonComponentProps<TPaginationConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    config: {
      options,
      style: { border },
    },
    id,
  } = value;
  const {
    margin,
    backgroundColor,
    border: paginationBorder,
    borderRadius,
    total,
    skip,
    pageButton,
    pageNumChanger,
    condition,
    textStyle,
    active,
  } = options;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    syncInteractiveAction,
    getValue,
    requestUrl = '',
    componentFilter = [],
    value: processedValue = [],
    componentFilterMap = [],
    onCondition,
  } = useComponent<TPaginationConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

  const {
    current: requestCurrent,
    pageSize: requestPageSize,
    ...finalValue
  } = useMemo(() => {
    return (
      FilterDataUtil.getFieldMapValue(processedValue, {
        map: componentFilterMap,
      }) || {}
    );
  }, [processedValue, componentFilterMap]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-interactive-pagination'],
    );
  }, [className]);

  const onChange = (value: number, pageSize: number) => {
    setCurrentPage(value);
    setPageSize(pageSize);
  };

  const showTotal: PaginationProps['showTotal'] | undefined = useMemo(() => {
    if (!total.show) return undefined;
    return function (pageTotal, range) {
      return (
        <span
          style={{
            color: getRgbaString(total.textStyle.color),
            fontSize: total.textStyle.fontSize + 'px',
            fontWeight: total.textStyle.fontWeight,
            fontFamily: total.textStyle.fontFamily,
          }}
        >
          /{pageTotal}
        </span>
      );
    };
  }, [total]);

  const itemRender: PaginationProps['itemRender'] = useMemo(() => {
    const {
      type,
      value: [prev, next],
      color,
      size,
    } = pageButton;
    const commonStyle: CSSProperties = {
      fontSize: `${size}px`,
      color: getRgbaString(color),
    };
    return (_, buttonType, originalElement) => {
      if (buttonType === 'prev') {
        return (
          <a style={commonStyle}>
            {type === 'text' ? prev : <span className={`bi ${prev}`}></span>}
          </a>
        );
      }
      if (buttonType === 'next') {
        return (
          <a style={commonStyle}>
            {type === 'text' ? next : <span className={`bi ${next}`}></span>}
          </a>
        );
      }
      return originalElement;
    };
  }, [pageButton, paginationBorder]);

  useEffect(() => {
    setCurrentPage(requestCurrent);
    setPageSize(requestPageSize);
    syncInteractiveAction('page_change', {
      current: requestCurrent,
      pageSize: requestPageSize,
      total,
    });
  }, [requestCurrent, requestPageSize, total]);

  return (
    <ConditionComponent
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
        <div className="w-100 h-100 dis-flex-cen">
          <AntPagination
            total={finalValue.total}
            current={currentPage}
            onChange={onChange}
            pageSize={pageSize}
            itemRender={itemRender}
            showTotal={showTotal}
            showQuickJumper={skip.show}
            pageSizeOptions={pageNumChanger.pageEnum.split('/')}
            style={{
              // @ts-ignore
              '--component-pagination-border-radius': borderRadius + 'px',
              '--component-pagination-margin': margin + 'px',
              '--component-pagination-background-color':
                getRgbaString(backgroundColor),
              '--component-pagination-border': `${paginationBorder.width}px ${
                paginationBorder.type
              } ${getRgbaString(paginationBorder.color)}`,
              '--component-pagination-border-width': `${paginationBorder.width}px`,
              '--component-pagination-text-color': getRgbaString(
                textStyle.color,
              ),
              '--component-pagination-text-size': textStyle.fontSize + 'px',
              '--component-pagination-text-weight': textStyle.fontWeight,
              '--component-pagination-text-family': textStyle.fontFamily,
              '--component-pagination-text-active-color': getRgbaString(
                active.textStyle.color,
              ),
              '--component-pagination-text-active-size':
                active.textStyle.fontSize + 'px',
              '--component-pagination-text-active-weight':
                active.textStyle.fontWeight,
              '--component-pagination-text-active-family':
                active.textStyle.fontFamily,
              '--component-pagination-active-background-color': getRgbaString(
                active.backgroundColor,
              ),
              '--component-pagination-active-border': `${
                active.border.width
              }px ${active.border.type} ${getRgbaString(active.border.color)}`,
              '--component-pagination-active-border-width': `${active.border.width}px`,
              '--component-pagination-total-margin': `${total.margin}px`,
              '--component-pagination-prev-next-border': pageButton.border.show
                ? `${paginationBorder.width}px ${
                    paginationBorder.type
                  } ${getRgbaString(paginationBorder.color)}`
                : 'none',
              '--component-pagination-prev-next-background-color':
                getRgbaString(pageButton.backgroundColor),

              '--component-pagination-skip-color': getRgbaString(
                skip.textStyle.color,
              ),
              '--component-pagination-skip-size':
                skip.textStyle.fontSize + 'px',
              '--component-pagination-skip-weight': skip.textStyle.fontWeight,
              '--component-pagination-skip-family': skip.textStyle.fontFamily,
              '--component-pagination-skip-margin': `${skip.margin}px`,

              '--component-pagination-changer-size': `${pageNumChanger.arrow.size}px`,
              '--component-pagination-changer-color': getRgbaString(
                pageNumChanger.arrow.color,
              ),
            }}
          />
        </div>
      </Wrapper>
      <FetchFragment
        id={id}
        url={requestUrl}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </ConditionComponent>
  );
};

const WrapperPagination: typeof Pagination & {
  id: ComponentData.TComponentSelfType;
} = Pagination as any;

WrapperPagination.id = CHART_ID;

export default WrapperPagination;
