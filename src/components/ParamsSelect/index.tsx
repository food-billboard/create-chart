import { Select } from 'antd';
import { connect } from 'dva';
import { isEqual } from 'lodash';
import { useMemo, useCallback, useState } from 'react';
import classnames from 'classnames';
import { SelectProps } from 'antd/es/select';
import VariableStringUtil from '@/utils/Assist/VariableString';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Option } = Select;

const ParamsSelect = (
  props: {
    params: ComponentData.TParams[];
    constants: ComponentData.TConstants[];
    value: string[];
    onChange?: (value: string[]) => void;
  } & Omit<SelectProps, 'value' | 'onChange'>,
) => {
  const {
    params,
    constants,
    value,
    onChange,
    className,
    onBlur,
    ...nextProps
  } = props;

  const [stateValue, setStateValue] = useState<string[]>(value);

  const dataSource = useMemo(() => {
    return VariableStringUtil.getAllGlobalParams4Array(params, constants);
  }, [params, constants]);

  const domList = useMemo(() => {
    return dataSource.map((item) => {
      const { key, id } = item;
      return (
        <Option key={id} value={id}>
          {key}
        </Option>
      );
    });
  }, [dataSource]);

  const handleBlur = useCallback(
    (e) => {
      if (!isEqual(value, stateValue)) onChange?.(stateValue);
      onBlur?.(e);
    },
    [onChange, stateValue, onBlur, value],
  );

  const handleChange = useCallback((value) => {
    setStateValue(value);
  }, []);

  return (
    <Select
      mode="tags"
      allowClear
      className={classnames('w-100', className)}
      placeholder="选择全局参数"
      value={stateValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...nextProps}
    >
      {domList}
    </Select>
  );
};

const InternalParamsSelectSingle = (
  props: {
    params: ComponentData.TParams[];
    constants: ComponentData.TConstants[];
    value: string;
    onChange?: (value: string) => void;
  } & Omit<SelectProps, 'value' | 'onChange'>,
) => {
  const {
    params,
    constants,
    value,
    onChange,
    className,
    onBlur,
    ...nextProps
  } = props;

  const [stateValue, setStateValue] = useState<string>(value);

  const dataSource = useMemo(() => {
    return VariableStringUtil.getAllGlobalParams4Array(params, constants);
  }, [params, constants]);

  const domList = useMemo(() => {
    return dataSource.map((item) => {
      const { key, value, id } = item;
      return (
        <Option key={id} value={id}>
          {key}
        </Option>
      );
    });
  }, [dataSource]);

  const handleBlur = useCallback(
    (e) => {
      if (stateValue !== value) onChange?.(stateValue);
      onBlur?.(e);
    },
    [onChange, stateValue, onBlur, value],
  );

  const handleChange = useCallback((value) => {
    const [target] = value.slice(-1);
    setStateValue(target || '');
  }, []);

  return (
    <Select
      mode="tags"
      allowClear
      className={classnames('w-100', className)}
      placeholder="选择全局参数"
      value={stateValue ? [stateValue] : []}
      onChange={handleChange}
      onBlur={handleBlur}
      {...nextProps}
    >
      {domList}
    </Select>
  );
};

export const ParamsSelectSingle = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalParamsSelectSingle);

export default connect(mapStateToProps, mapDispatchToProps)(ParamsSelect);
