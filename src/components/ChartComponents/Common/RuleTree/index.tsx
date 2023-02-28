import { useCallback } from 'react';
import { Button } from 'antd';
import { DEFAULT_CONDITION_CONFIG_ITEM_RULE } from '@/utils/constants/defaultComponentConfig';
import Header from './components/Header';
import Condition from './components/Condition';
import styles from './index.less';

const RuleTree = (props: {
  value: ComponentData.ComponentRuleCondition;
  onChange: (value: ComponentData.ComponentRuleCondition) => void;
}) => {
  const { value, onChange } = props;
  const { type, rule } = value;

  const handleAdd = useCallback(() => {
    const newRule: ComponentData.ComponentRuleConditionItem = {
      ...DEFAULT_CONDITION_CONFIG_ITEM_RULE(),
    };
    onChange({
      ...value,
      rule: [...value.rule, newRule],
    });
  }, [value, onChange]);

  return (
    <div className={styles['component-rule-tree']}>
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
            onChange={(newRuleItem) => {
              const newRule = [...rule];
              if (!newRuleItem.rule.length) {
                newRule.splice(index, 1);
              } else {
                newRule.splice(index, 1, newRuleItem);
              }
              onChange({
                ...value,
                rule: newRule,
              });
            }}
          />
        );
      })}
      <div className={styles['component-rule-tree-add']}>
        <Button block type="primary" onClick={handleAdd}>
          新增条件
        </Button>
      </div>
    </div>
  );
};

export default RuleTree;
