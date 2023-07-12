import { useCallback } from 'react';
import VariableStringUtil from '@/utils/Assist/VariableString';
import { getGlobalParamsAndFilterAndConstants } from './useComponent';

export function useGroupComponent<P extends object = {}>(
  props: ComponentData.ComponentProps<P>,
) {
  const { global } = props;
  const { screenType } = global;

  // 条件判断
  const getConditionResult: (
    params: ComponentData.TParams[],
    constants: ComponentData.TConstants[],
    condition: ComponentData.ComponentCondition,
  ) => ComponentData.ComponentConditionActionType | false = useCallback(
    (globalParams, constants, condition) => {
      if (screenType === 'edit') return false;
      const { type, action, value } = condition;
      const { code, condition: valueCondition } = value;
      let result: boolean = false;
      if (type === 'code') {
        const { code: dealCode } = code;
        // 代码执行
        let conditionFunction = new Function('data', dealCode);
        try {
          result = conditionFunction(
            VariableStringUtil.getAllGlobalParams(globalParams, constants),
          );
        } catch (err) {
          console.error(err);
          result = false;
        }
      } else {
        const { type, rule } = valueCondition;
        const method = type === 'and' ? 'every' : 'some';
        result = rule[method]((item) => {
          const { rule, type } = item;
          const method = type === 'and' ? 'every' : 'some';
          return rule[method]((item) => {
            const { params, value, condition } = item;
            if (!params) return false;
            const allParams = VariableStringUtil.getAllGlobalParams4Array(
              globalParams,
              constants,
            );
            const target = allParams.find((item) => item.id === params);
            if (!target) return false;

            switch (condition) {
              case 'equal':
                return target.value == value;
              case 'great-then':
                return target.value! > value;
              case 'include':
                return target.value?.includes(value);
              case 'less-then':
                return target.value! < value;
              case 'not-great-then':
                return target.value! <= value;
              case 'not-less-then':
                return target.value! >= value;
            }

            return false;
          });
        });
      }

      return result ? action : false;
    },
    [screenType],
  );

  // 外部调用条件判断
  const outerGetConditionResult = useCallback(
    (condition: ComponentData.ComponentCondition) => {
      const { params = [], constants = [] } =
        getGlobalParamsAndFilterAndConstants();
      return getConditionResult(params, constants, condition);
    },
    [getConditionResult],
  );

  return {
    onCondition: outerGetConditionResult,
  };
}
