import { useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Input from '../../../Input';
import InnerConnect from '../InnerConnect';
import styles from './index.less';

const ConditionItem = (props: {
  value: ComponentData.ComponentRuleConditionItemRule;
  onChange: (value: ComponentData.ComponentRuleConditionItemRule) => void;
  onDelete: () => void;
  first: boolean;
  last: boolean;
}) => {
  const { value, onChange, onDelete, first, last } = props;
  const { params, condition, value: conditionValue } = value;

  return (
    <div className={styles['component-rule-tree-condition-item']}>
      <Input
        value={params}
        onChange={(newParams) => {
          onChange({
            ...value,
            params: newParams as any,
          });
        }}
      />
      <Select
        value={condition}
        onChange={(condition) => {
          onChange({
            ...value,
            condition,
          });
        }}
        options={[
          {
            label: '小于',
            value: 'less-then',
          },
          {
            label: '大于',
            value: 'great-then',
          },
          {
            label: '等于',
            value: 'equal',
          },
          {
            label: '不小于',
            value: 'not-less-then',
          },
          {
            label: '不大于',
            value: 'not-great-then',
          },
          {
            label: '包含',
            value: 'include',
          },
        ]}
      />
      <Input
        value={conditionValue}
        onChange={(conditionValue) => {
          onChange({
            ...value,
            value: conditionValue as any,
          });
        }}
      />
      <DeleteOutlined onClick={onDelete} className="c-po" />
    </div>
  );
};

const Condition = (props: {
  value: ComponentData.ComponentRuleConditionItem;
  onChange: (value: ComponentData.ComponentRuleConditionItem) => void;
}) => {
  const { value, onChange } = props;
  const { rule } = value;

  const counter = rule.length;

  const handleAdd = useCallback(() => {}, []);

  const hasRule = useMemo(() => {
    return true;
  }, []);

  const RuleNode = useMemo(() => {
    if (!hasRule) return null;
    return <div></div>;
  }, [hasRule]);

  return (
    <div className={styles['component-rule-tree-condition']}>
      {RuleNode}
      {rule.map((item, index) => {
        const { id } = item;
        return (
          <ConditionItem
            key={id}
            value={item}
            first={index === 0}
            last={index + 1 === counter}
            onChange={(newRuleItem) => {
              const newRule = [...rule];
              newRule.splice(index, 1, newRuleItem);
              onChange({
                ...value,
                rule: newRule,
              });
            }}
            onDelete={() => {
              const newRule = [...rule];
              newRule.splice(index, 1);
              onChange({
                ...value,
                rule: newRule,
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default Condition;
