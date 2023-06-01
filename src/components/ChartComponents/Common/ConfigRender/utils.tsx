import { ReactNode } from 'react';
import ConfigList from '../Structure/ConfigList';
import { SingleCollapse as Collapse } from '../Collapse';
import type { SingleCollapseProps } from '../Collapse';
import { SubConfigSchema, FromType } from './type';

// TODO
// 看看将配置面板修改成schema形式是否会对性能带来影响

const { Item } = ConfigList;

const FORM_MAP: {
  [key in FromType]: (
    schema: SubConfigSchema,
    dataSource: any,
    onKeyChange: (key: string, value: any) => void,
  ) => ReactNode;
} = {
  COLLAPSE: function (schema, dataSource, onKeyChange) {
    const { key, label, extraProps: _extraProps, children } = schema;
    const hasShow = typeof dataSource.show === 'boolean';
    const extraProps = _extraProps as SingleCollapseProps;
    return (
      <Collapse
        {...extraProps}
        child={{
          header: label,
          key,
          ...(hasShow
            ? {
                visibleRender: true,
                onChange: onKeyChange.bind(null, 'show'),
                value: dataSource.show,
                ...extraProps.child,
              }
            : {}),
        }}
      >
        {getForm(children, dataSource, onKeyChange)}
      </Collapse>
    );
  },
  NORMAL: function () {
    return <div></div>;
  },
};

export function getForm(
  schema: SubConfigSchema[],
  dataSource: any,
  onKeyChange: (key: string, value: any) => void,
) {
  return schema.map((schema) => {
    const { formType } = schema;
    return (FORM_MAP[formType] || FORM_MAP.NORMAL)(
      schema,
      dataSource,
      onKeyChange,
    );
  });
}
