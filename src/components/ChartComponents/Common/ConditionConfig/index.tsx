import { ReactNode, useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { nanoid } from 'nanoid';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

export type ConditionConfigProps = {
  value: ComponentData.ComponentCondition[];
  onChange?: (value: any) => void;
  children?: ReactNode;
};

const ConditionConfig = (props: ConditionConfigProps) => {
  const { value, onChange, children } = props;

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      onChange?.({
        [key]: value,
      });
    },
    [onChange],
  );

  const conditionList = useMemo(() => {
    return (
      <MultipleSeriesConfig
        counter={value.length}
        renderContent={(index) => {
          const item = value[index];
          const {
            id,
            action,
            type,
            relation,
            condition: { code, condition },
          } = item;
          return (
            <>
              <Item label="条件类型">
                <FullForm>
                  <Select
                    value={type}
                    options={[
                      {
                        label: '条件',
                        value: 'condition',
                      },
                      {
                        label: '自定义',
                        value: 'code',
                      },
                    ]}
                    onChange={(value) => {
                      const newValue = [...value];
                      newValue.splice(index, 1, {
                        ...item,
                        type: value,
                      } as any);
                    }}
                  />
                </FullForm>
              </Item>
            </>
          );
        }}
        onAdd={() => {
          const newValue = [
            ...value,
            {
              id: nanoid(),
              action: 'hidden',
              type: 'condition',
              relation: [],
              condition: {
                code: '',
                condition: [],
              },
            },
          ];
        }}
        onRemove={(index) => {
          const newValue = [...value];

          newValue.splice(index, 1);
        }}
        max={3}
      />
    );
  }, [value, onKeyChange]);

  return (
    <ConfigList>
      {conditionList}
      {children}
    </ConfigList>
  );
};

export default ConditionConfig;
