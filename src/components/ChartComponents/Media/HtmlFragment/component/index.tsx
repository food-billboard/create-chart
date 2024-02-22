import classnames from 'classnames';
import { uniqueId, merge, noop } from 'lodash';
import { CSSProperties, useMemo, useRef } from 'react';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import { CHART_ID } from '../id';
import { THtmlFragmentConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const HtmlFragment = (
  props: ComponentData.CommonComponentProps<THtmlFragmentConfig>,
) => {
  const { className, style, value, global, children, wrapper: Wrapper } = props;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { fragment, condition, textStyle } = options;
  const { screenType } = global;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const { onCondition } = useComponent<THtmlFragmentConfig>({
    component: value,
    global,
  });

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const componentStyle = useMemo(() => {
    let baseStyle: CSSProperties = {
      ...textStyle,
      color: getRgbaString(textStyle.color),
    };
    return baseStyle;
  }, [textStyle]);

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-media-html-fragment'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

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
          conditionStyle,
        )}
        id={chartId.current}
      >
        <Wrapper border={border}>
          {children}
          <div
            style={componentStyle}
            className="w-100 h-100"
            dangerouslySetInnerHTML={{
              __html: fragment,
            }}
          />
        </Wrapper>
      </div>
      <FetchFragment
        id={id}
        url={''}
        reFetchData={async () => ''}
        reGetValue={noop}
        reCondition={propsOnCondition}
        componentFilter={[]}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperHtmlFragment: typeof HtmlFragment & {
  id: ComponentData.TComponentSelfType;
} = HtmlFragment as any;

WrapperHtmlFragment.id = CHART_ID;

export default WrapperHtmlFragment;
