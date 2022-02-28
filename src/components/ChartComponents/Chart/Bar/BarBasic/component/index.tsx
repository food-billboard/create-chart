import { CSSProperties } from 'react';
import { TBarBasicConfig } from '../type';

const BarBasic = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TBarBasicConfig>;
}) => {
  const { className, style, value } = props;

  return (
    <h1 className={className} style={style}>
      hello
    </h1>
  );
};

const WrapperBarBasic: typeof BarBasic & {
  id: ComponentData.TComponentSelfType;
} = BarBasic as any;

WrapperBarBasic.id = 'BAR_BASIC';

export default WrapperBarBasic;
