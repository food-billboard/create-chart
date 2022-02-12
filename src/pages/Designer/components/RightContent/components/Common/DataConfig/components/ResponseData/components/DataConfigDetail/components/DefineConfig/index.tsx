import ApiConfig, { ApiConfigProps } from './ApiConfig';
import StaticConfig from './StaticConfig';
import { TOnChange } from './type.d';

const DefineConfig = (props: {
  type?: 'api' | 'static';
  staticProps?: {
    value?: string;
    onChange?: TOnChange;
  };
  apiProps?: Omit<ApiConfigProps, 'params'>;
}) => {
  const { type, staticProps, apiProps } = props;

  if (type === 'api') return <ApiConfig {...apiProps!} />;

  return <StaticConfig {...staticProps!} />;
};

export default DefineConfig;
