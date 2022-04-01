import { useCallback } from 'react';
import { Button } from 'antd';
import { uniqueId } from 'lodash';
import Header from './components/Header';
import Condition from './components/Condition';

const RULE_OUTER_ID = 'RULE_OUTER_ID';
export const RULE_INNER_ID = 'RULE_INNER_ID';

const RuleTree = (props: {
  value: ComponentData.ComponentRuleCondition;
  onChange: (value: ComponentData.ComponentRuleCondition) => void;
}) => {
  const { value, onChange } = props;
  const { type, rule } = value;

  const handleAdd = useCallback(() => {
    const newRule: ComponentData.ComponentRuleConditionItem = {
      id: uniqueId(RULE_OUTER_ID),
      type: 'and',
      rule: [
        {
          id: uniqueId(RULE_OUTER_ID),
          params: '',
          condition: 'less-then',
          value: '',
        },
      ],
      next: false,
    };
    onChange({
      ...value,
      rule: [...value.rule, newRule],
    });
  }, [value, onChange]);

  return (
    <div>
      <Header
        isTop
        value={type}
        onChange={(type) => {
          onChange({
            ...value,
            type,
          });
        }}
      />
      {rule.map((item, index) => {
        const { id } = item;
        return (
          <Condition
            value={item}
            key={id}
            onChange={(value) => {
              const newRule = [...rule];
              if (!value.rule.length) {
                newRule.splice(index, 1);
              } else {
                newRule.splice(index, 1, value);
              }
              onChange({
                ...value,
                rule: newRule,
              });
            }}
          />
        );
      })}
      <Button block type="primary" onClick={handleAdd}>
        新增条件
      </Button>
    </div>
  );
};

export default RuleTree;
