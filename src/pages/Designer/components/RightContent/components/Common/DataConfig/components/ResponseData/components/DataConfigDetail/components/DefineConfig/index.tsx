import ApiConfig from './ApiConfig';
import StaticConfig from './StaticConfig';

const DefineConfig = (props: { method?: 'api' | 'static' }) => {
  const { method, ...nextProps } = props;

  if (method === 'api') return <ApiConfig {...nextProps} />;

  return <StaticConfig {...nextProps} />;
};

export default DefineConfig;
