import ApiConfig, { ApiConfigProps } from './ApiConfig';
import StaticConfig from './StaticConfig';
import { TOnChange } from './type.d';

const DefineConfig = (props: {
  method?: 'api' | 'static';
  staticProps?: {
    value?: string;
    onChange?: TOnChange;
  };
  apiProps?: ApiConfigProps;
}) => {
  const { method, staticProps, apiProps } = props;

  if (method === 'api') return <ApiConfig {...apiProps!} />;

  return <StaticConfig {...staticProps!} />;
};

export default DefineConfig;
