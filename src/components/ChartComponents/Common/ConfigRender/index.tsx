import { useMemo } from 'react';
import { get } from 'lodash';
import ComponentOptionConfig, { Tab } from '../ComponentOptionConfig';
import ConfigList from '../Structure/ConfigList';
import { SubConfigRender, SubMultipleConfigRender } from './SubConfigRender';
import { ConfigRenderProps, ConfigSchema } from './type';

const ConfigRender = (props: ConfigRenderProps) => {
  const { value, onChange, schema } = props;

  const valueGet = (valueSchema: ConfigSchema['valueSchema']) => {
    return valueSchema.map((schema) => {
      const [key, valueSchema] = schema;
      return [key, get(value, valueSchema)];
    });
  };

  const items = useMemo(() => {
    return schema.map((item) => {
      const { label, children, valueSchema, extraProps, ...nextItem } = item;
      const value = valueGet(valueSchema);
      const Component =
        value.length > 1 ? SubMultipleConfigRender : SubConfigRender;
      return {
        ...nextItem,
        label: <Tab>{label}</Tab>,
        children: (
          <ConfigList level={1}>
            <Component
              schema={children}
              value={valueGet(valueSchema)}
              onChange={onChange}
              label={label}
              key={nextItem.key}
              {...extraProps}
            />
          </ConfigList>
        ),
      };
    });
  }, [schema, onChange, value]);

  return <ComponentOptionConfig items={items} />;
};

export default ConfigRender;
