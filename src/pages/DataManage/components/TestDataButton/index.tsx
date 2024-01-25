import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { useCallback } from 'react';
import { getTestDataSource } from '@/services';

const TestDataButton = (
  props: Partial<API_DATA_MANAGE.DataSourceData> & {
    buttonProps?: Partial<ButtonProps>;
    getValues?: () => API_DATA_MANAGE.DataSourceData;
  },
) => {
  const { buttonProps = {}, getValues, ...nextProps } = props;

  const handleTest = useCallback(async () => {
    await getTestDataSource(
      (getValues
        ? getValues()
        : nextProps) as API_DATA_MANAGE.PostDataSourceParams,
    );
  }, [nextProps, getValues]);

  return (
    <Button onClick={handleTest} {...buttonProps}>
      测试
    </Button>
  );
};

export default TestDataButton;
