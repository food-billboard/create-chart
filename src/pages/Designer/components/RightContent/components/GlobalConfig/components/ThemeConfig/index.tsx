import { useMemo, useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import ThemeUtil from '@/utils/Assist/Theme';

const ThemeConfig = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange: propsOnChange } = props;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dataSource = useMemo(() => {
    return Object.keys(ThemeUtil.themeDataSource).map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }, []);

  const onChange = useCallback(
    (value) => {
      propsOnChange(value);
      ThemeUtil.initCurrentThemeData(value);
    },
    [propsOnChange],
  );

  const hashChange = () => {
    const hash = location.hash;
    setIsEdit(/id=/.test(hash));
  };

  useEffect(() => {
    hashChange();
    window.addEventListener('hashchange', hashChange);
    return () => {
      window.removeEventListener('hashchange', hashChange);
    };
  }, []);

  return (
    <Select
      value={value}
      onChange={onChange}
      className="w-100"
      disabled={!!isEdit}
    >
      {dataSource.map((item) => {
        const { label, value } = item;
        return (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default ThemeConfig;
