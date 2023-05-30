import type { ReactNode } from 'react';
import { TabProps } from '../ComponentOptionConfig';
import type { TConfigListItemProps } from '../Structure/ConfigList';
import type { SingleCollapseProps } from '../Collapse';

export type FromType = 'NORMAL' | 'COLLAPSE';

type CommonSubConfigSchema<T extends FromType> = {
  formType: T;
  extraProps: T extends 'NORMAL' ? TConfigListItemProps : SingleCollapseProps;
  label: string | ReactNode;
  key: string;
  children: SubConfigSchema[];
};

export type SubConfigSchema =
  | CommonSubConfigSchema<'NORMAL'>
  | CommonSubConfigSchema<'COLLAPSE'>;

export type ConfigSchema = Pick<SubConfigSchema, 'key' | 'label'> & {
  valueSchema: [valueKey: string, valueSchema: string][];
  extraProps?: object;
  labelProps?: TabProps;
  children: SubConfigSchema[];
};

export type ConfigRenderProps<T extends object = {}> =
  ComponentData.ComponentConfigProps<T> & {
    schema: ConfigSchema[];
  };

export type SubConfigRenderProps = Pick<ConfigRenderProps, 'onChange'> &
  Pick<ConfigSchema, 'label' | 'key'> & {
    schema: SubConfigSchema[];
    value: any;
    [key: string]: any;
  };
