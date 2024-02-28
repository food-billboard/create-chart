import { Checkbox } from 'antd';
import { SelectProps } from 'antd/es/select';
import classnames from 'classnames';
import { merge } from 'lodash';
import { CSSProperties, useCallback, useMemo } from 'react';
import { connect } from 'umi';
import Select from '@/components/ChartComponents/Common/Select';
import VariableStringUtil from '@/utils/Assist/VariableString';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

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
    needChangeLazy = false,
    changeLazy,
    style,
    onChangeLazyChange,
    wrapperClassName,
    wrapperStyle,
    ...nextProps
  } = props;

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
    onChange,
    needChangeLazy = false,
    changeLazy,
    onChangeLazyChange,
    style,
    wrapperClassName,
    wrapperStyle,
    value,
    ...nextProps
  } = props;

  const realValue = useMemo(() => {
    return Array.isArray(value) ? value : value ? [value] : [];
  }, [value]);

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

  const handleChange = useCallback((value) => {
    const [target] = value.slice(-1);
    onChange?.(target);
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
        onChange={handleChange}
        {...nextProps}
        value={realValue}
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
