import ApiConfig, { ApiConfigProps } from './ApiConfig';
import StaticConfig from './StaticConfig';
import MockConfig, { MockConfigProps } from './MockConfig';
import { TOnChange } from './type';

const DefineConfig = (props: {
  type?: ComponentData.TComponentApiDataConfig['request']['type'];
  staticProps?: {
    value?: string;
    onChange?: TOnChange;
  };
  apiProps?: Omit<ApiConfigProps, 'params' | 'constants'>;
  mockProps?: Omit<MockConfigProps, 'params' | 'constants'>;
}) => {
  const { type, staticProps, apiProps, mockProps } = props;

  if (type === 'mock') return <MockConfig {...mockProps!} />;

  if (type === 'api') return <ApiConfig {...apiProps!} />;

  return <StaticConfig {...staticProps!} />;
};

export default DefineConfig;
