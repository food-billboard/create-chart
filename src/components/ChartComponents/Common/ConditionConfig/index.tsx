import { ReactNode, useCallback, useMemo } from 'react';
import { Radio, Select } from 'antd';
import MultipleSeriesConfig from '@/components/ChartComponents/Common/MultipleSeriesConfig';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import CodeEditor from './components/CodeEditor';
import { DEFAULT_CONDITION_CONFIG } from '../Constants/defaultConfig';
import ConfigList from '../Structure/ConfigList';
import FullForm from '../Structure/FullForm';
import RuleTree from '../RuleTree';

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
        buttonLabel="新增条件项"
        counter={value.length}
        seriesLabel={(index) => `条件${index + 1}`}
        renderContent={(index) => {
          const item = value[index];
          const {
            id,
            action,
            type,
            value: { condition, code },
          } = item;
          return (
            <>
              <Item label="条件类型">
                <FullForm>
                  <Radio.Group
                    className="w-100"
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
                    onChange={(e) => {
                      const newValue = [...value];
                      newValue.splice(index, 1, {
                        ...item,
                        type: e.target.value,
                      } as any);
                      onChange?.(newValue);
                    }}
                  />
                </FullForm>
              </Item>
              {type === 'condition' && (
                <div className="p-lr-8 m-tb-4">
                  <RuleTree
                    value={condition!}
                    onChange={(newCondition) => {
                      const newValue = [...value];
                      newValue.splice(index, 1, {
                        ...item,
                        value: {
                          code,
                          condition: newCondition,
                        },
                      });
                      onChange?.(newValue);
                    }}
                  />
                </div>
              )}
              {type === 'code' && (
                <CodeEditor
                  value={item.value.code}
                  onChange={(code) => {
                    const newValue = [...value];
                    newValue.splice(index, 1, {
                      ...item,
                      value: {
                        code,
                        condition,
                      },
                    });
                    onChange?.(newValue);
                  }}
                />
              )}
              <Item label="条件">
                <FullForm>
                  <Select
                    className="w-100"
                    value={action}
                    options={[
                      {
                        label: '显示',
                        value: 'visible',
                      },
                      {
                        label: '隐藏',
                        value: 'hidden',
                      },
                      {
                        label: '渐隐',
                        value: 'ease-out',
                      },
                      {
                        label: '渐显',
                        value: 'ease-in',
                      },
                      {
                        label: '渐隐渐显',
                        value: 'ease-in-out',
                      },
                    ]}
                    onChange={(action) => {
                      const newValue = [...value];
                      newValue.splice(index, 1, {
                        ...item,
                        action,
                      } as any);
                      onChange?.(newValue);
                    }}
                  />
                </FullForm>
              </Item>
            </>
          );
        }}
        onAdd={() => {
          const newValue = [...value, { ...DEFAULT_CONDITION_CONFIG() }];
          onChange?.(newValue);
        }}
        onRemove={(index) => {
          const newValue = [...value];
          newValue.splice(index, 1);
          onChange?.(newValue);
        }}
        max={GlobalConfig.CONDITION_COUNTER}
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
