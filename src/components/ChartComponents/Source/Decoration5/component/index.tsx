import { useMemo, useRef } from 'react';
import { uniqueId, merge } from 'lodash';
import classnames from 'classnames';
import ColorSelect from '@/components/ColorSelect';
import InternalDecoration from '@/components/Decoration/Decoration5';
import { TDecoration5Config } from '../type';
import { CHART_ID } from '../id';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const Decoration = (
  props: ComponentData.CommonComponentProps<TDecoration5Config>,
) => {
  const { className, style, value, children, wrapper: Wrapper } = props;

  const {
    config: {
      options,
      style: { border },
    },
  } = value;
  const { color, dur } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'dis-flex',
      styles['component-source-decoration-5'],
    );
  }, [className]);

  return (
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
        <InternalDecoration
          className={'w-100 h-100'}
          color={color.map((item) => getRgbaString(item))}
          dur={dur}
        ></InternalDecoration>
      </Wrapper>
    </div>
  );
};

const WrapperDecoration: typeof Decoration & {
  id: ComponentData.TComponentSelfType;
} = Decoration as any;

WrapperDecoration.id = CHART_ID;

export default WrapperDecoration;
