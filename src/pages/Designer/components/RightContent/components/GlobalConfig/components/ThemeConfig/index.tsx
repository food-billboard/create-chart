import { useMemo, useCallback, useState } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import { useHash } from '@/hooks';
import ThemeUtil from '@/utils/Assist/Theme';

export const BaseThemeConfig = (props: {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) => {
  const { value, onChange: propsOnChange, disabled } = props;

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
      propsOnChange?.(value);
      ThemeUtil.initCurrentThemeData({
        themeConfig: value,
      });
    },
    [propsOnChange],
  );

  return (
    <Select
      value={value}
      onChange={onChange}
      className="w-100"
      disabled={!!disabled}
      options={dataSource}
    />
  );
};

const ThemeConfig = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(/id=/.test(location.hash));

  useHash((hash) => {
    setIsEdit(/id=/.test(hash));
  });

  return <BaseThemeConfig disabled={isEdit} {...props} />;
};

export default ThemeConfig;
