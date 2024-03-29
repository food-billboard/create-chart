import Select from '@/components/ChartComponents/Common/Select';
import VariableStringUtil from '@/utils/Assist/VariableString';
import { Checkbox } from 'antd';
import { SelectProps } from 'antd/es/select';
import classnames from 'classnames';
import { isEqual, merge } from 'lodash';
import { CSSProperties, useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const { Option } = Select;

type CommonProps = {
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  needChangeLazy?: boolean;
  changeLazy?: boolean;
  onChangeLazyChange?: (changeLazy: boolean) => void;
};

// 关联参数多选
const ParamsSelect = (
  props: {
    value: string[];
    onChange?: (value: string[]) => void;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
  } & Omit<SelectProps, 'value' | 'onChange'> &
    CommonProps,
) => {
  const {
    params,
    constants,
    value,
    onChange,
    onBlur,
    needChangeLazy = false,
    changeLazy,
    style,
    onChangeLazyChange,
    wrapperClassName,
    wrapperStyle,
    ...nextProps
  } = props;

  const [stateValue, setStateValue] = useState<string[]>(value);

  const dataSource = useMemo(() => {
    return VariableStringUtil.getAllGlobalParams4Array(params, constants);
  }, [params, constants]);

  const options = useMemo(() => {
    return dataSource.map((item) => {
      const { key, id } = item;
      return {
        label: key,
        value: id,
      };
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

  const changeLazyNode = useMemo(() => {
    if (!needChangeLazy) return null;
    return (
      <Checkbox
        checked={changeLazy}
        onChange={(e) => onChangeLazyChange?.(e.target.checked)}
        className={styles['params-select-checkbox']}
        style={{ marginLeft: 8 }}
      >
        懒更新
      </Checkbox>
    );
  }, [needChangeLazy, changeLazy, onChangeLazyChange]);

  return (
    <div
      className={classnames('dis-flex flex-al-cen', wrapperClassName)}
      style={wrapperStyle}
    >
      <Select
        mode="tags"
        allowClear
        style={merge(style, {
          width: needChangeLazy ? 'calc(100% - 80px)' : '100%',
        })}
        placeholder="选择全局参数"
        value={stateValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {...nextProps}
        options={options}
      />
      {changeLazyNode}
    </div>
  );
};

// 关联参数单选
const InternalParamsSelectSingle = (
  props: {
    value: string;
    onChange?: (value: string) => void;
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
  } & Omit<SelectProps, 'value' | 'onChange'> &
    CommonProps,
) => {
  const {
    params,
    constants,
    value,
    onChange,
    onBlur,
    needChangeLazy = false,
    changeLazy,
    onChangeLazyChange,
    style,
    wrapperClassName,
    wrapperStyle,
    ...nextProps
  } = props;

  const [stateValue, setStateValue] = useState<string>(value);

  const dataSource = useMemo(() => {
    return VariableStringUtil.getAllGlobalParams4Array(params, constants);
  }, [params, constants]);

  const options = useMemo(() => {
    return dataSource.map((item) => {
      const { key, value, id } = item;
      return {
        label: key,
        value: id,
      };
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

  const changeLazyNode = useMemo(() => {
    if (!needChangeLazy) return null;
    return (
      <Checkbox
        checked={changeLazy}
        onChange={(e) => onChangeLazyChange?.(e.target.checked)}
        className={styles['params-select-checkbox']}
        style={{ marginLeft: 8 }}
      >
        懒更新
      </Checkbox>
    );
  }, [needChangeLazy, changeLazy, onChangeLazyChange]);

  return (
    <div
      className={classnames('dis-flex flex-al-cen', wrapperClassName)}
      style={wrapperStyle}
    >
      <Select
        mode="tags"
        allowClear
        style={merge(style, {
          width: needChangeLazy ? 'calc(100% - 80px)' : '100%',
        })}
        placeholder="选择全局参数"
        value={stateValue ? [stateValue] : []}
        onChange={handleChange}
        onBlur={handleBlur}
        {...nextProps}
        options={options}
      />
      {changeLazyNode}
    </div>
  );
};

export const ParamsSelectSingle = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalParamsSelectSingle);

export default connect(mapStateToProps, mapDispatchToProps)(ParamsSelect);
