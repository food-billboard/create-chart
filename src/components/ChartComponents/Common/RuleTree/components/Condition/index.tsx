import { useCallback, useMemo, CSSProperties } from 'react';
import { Select } from 'antd';
import classnames from 'classnames';
import { DeleteOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { ParamsSelectSingle } from '@/components/ParamsSelect';
import { DEFAULT_CONDITION_CONFIG_ITEM_RULE_VALUE } from '@/utils/constants/defaultComponentConfig';
import Input from '../../../Input';
import Header from '../Header';
import styles from './index.less';

const ConnectLine = (props: { className?: string; style?: CSSProperties }) => {
  const { style, className } = props;
  return (
    <div
      className={classnames(
        styles['component-rule-tree-condition-connect'],
        className,
      )}
      style={style}
    ></div>
  );
};

const COMMON_CONDITION_ITEM_CLASS = classnames(
  'm-lr-4',
  styles['component-rule-tree-condition-item-form'],
);

const ConditionItem = (props: {
  value: ComponentData.ComponentRuleConditionItemRule;
  onChange: (value: ComponentData.ComponentRuleConditionItemRule) => void;
  onDelete: () => void;
  first: boolean;
  last: boolean;
  single: boolean;
}) => {
  const { value, onChange, onDelete, first, last, single } = props;
  const { params, condition, value: conditionValue } = value;

  return (
    <div
      className={classnames(
        styles['component-rule-tree-condition-item'],
        'design-config-format-font-size',
        {
          'component-rule-tree-connect': !single,
          'component-rule-tree-connect-no-after': last || single,
          'component-rule-tree-connect-no-before': first && single,
        },
      )}
    >
      <ParamsSelectSingle
        value={params}
        style={{
          height: 24,
          width: 74,
        }}
        onChange={(newParams) => {
          onChange({
            ...value,
            params: newParams as any,
          });
        }}
        className={classnames(COMMON_CONDITION_ITEM_CLASS, 'dis-in-b')}
      />
      <Select
        className={classnames(COMMON_CONDITION_ITEM_CLASS, 'dis-in-b')}
        value={condition}
        style={{ width: 74, minWidth: 74 }}
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
            label: '不等于',
            value: 'not-equal',
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
        className={classnames(COMMON_CONDITION_ITEM_CLASS, 'dis-in-b')}
        value={conditionValue}
        onChange={(conditionValue) => {
          onChange({
            ...value,
            value: conditionValue as any,
          });
        }}
        style={{
          height: 24,
          width: 53,
        }}
      />
      <DeleteOutlined
        onClick={onDelete}
        className={classnames('m-lr-4', 'c-po')}
      />
      {!last && !single && (
        <ConnectLine
          className={styles['component-rule-tree-condition-connect-inner']}
        />
      )}
    </div>
  );
};

const Condition = (props: {
  value: ComponentData.ComponentRuleConditionItem;
  onChange: (value: ComponentData.ComponentRuleConditionItem) => void;
}) => {
  const { value, onChange } = props;
  const { rule, type } = value;

  const counter = rule.length;

  const handleAdd = useCallback(() => {
    const newRuleItem: ComponentData.ComponentRuleConditionItemRule = {
      ...DEFAULT_CONDITION_CONFIG_ITEM_RULE_VALUE(),
    };
    const newRule = [...rule, newRuleItem];

    onChange({
      ...value,
      rule: newRule,
    });
  }, [onChange, rule, value]);

  const hasRule = useMemo(() => {
    return counter !== 1;
  }, [counter]);

  const RuleNode = useMemo(() => {
    if (!hasRule) return null;
    return (
      <Header
        value={type}
        onChange={(newType) => {
          onChange({
            ...value,
            type: newType,
          });
        }}
        className={classnames(styles['component-rule-tree-condition-header'])}
      />
    );
  }, [hasRule, type, onChange, value]);

  const addButton = useMemo(() => {
    return (
      <PlusCircleTwoTone
        className={styles['component-rule-tree-condition-add']}
        onClick={handleAdd}
      />
    );
  }, [handleAdd]);

  return (
    <div
      className={classnames(
        styles['component-rule-tree-condition'],
        'component-rule-tree-connect',
      )}
    >
      {RuleNode}
      {rule.map((item, index) => {
        const { id } = item;
        return (
          <ConditionItem
            key={id}
            value={item}
            first={index === 0}
            last={index + 1 === counter}
            single={counter === 1}
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
      {addButton}
      <ConnectLine />
    </div>
  );
};

export default Condition;
