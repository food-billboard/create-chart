import { useCallback } from 'react';
import { get } from 'lodash';

const PRESET_VALIDATOR: {
  [key: string]: BaseValidator;
} = {
  'gt-0': {
    validator: (value) => parseFloat(value) == value && value > 0,
    correctValue: 1,
  },
  'lt-0': {
    validator: (value) => parseFloat(value) == value && value < 0,
    correctValue: -1,
  },
  'gt-e-0': {
    validator: (value) => parseFloat(value) == value && value >= 0,
    correctValue: 0,
  },
  'lt-e-0': {
    validator: (value) => parseFloat(value) == value && value <= 0,
    correctValue: 0,
  },
  integer: {
    validator: (value) => parseInt(value) == value,
    correctValue: (value: any) => parseInt(value) || 0,
  },
};

export type BaseValidator = {
  validator: (value: any) => boolean;
  correctValue: any | ((value: any) => any);
};

export type Validator = keyof typeof PRESET_VALIDATOR | BaseValidator;

export type OnChangeParams = {
  valueGetter?: 'target.value' | 'target.checked' | string;
  validator?: Validator[];
};

export type OnChangeType<T extends Array<any> = [value: any]> = (
  config: OnChangeParams,
  ...args: T
) => boolean;

export function useValidatorChange<T extends (...args: any[]) => void>(
  propsOnChange: T,
) {
  const validatorValue = useCallback(
    (value: any, valueGetter, validator: Validator[]) => {
      let realValue = valueGetter ? get(value, valueGetter ?? '') : value;

      for (let index = 0; index < validator.length; index++) {
        const current = validator[index];
        let target: BaseValidator;
        if (typeof current === 'string' || typeof current === 'number') {
          target = PRESET_VALIDATOR[current] || { validator: () => true };
        } else {
          target = current;
        }
        const isValid = target.validator(realValue);
        if (!isValid) realValue = target.correctValue;
      }
      return realValue;
    },
    [],
  );

  const onChange: OnChangeType<Parameters<T>> = useCallback(
    (params, ...args) => {
      const { valueGetter = '', validator = [] } = params;
      const rest = args.slice(0, -1);
      const [value] = args.slice(-1);

      const realValue = validatorValue(value, valueGetter, validator);

      propsOnChange(...rest, realValue);

      return true;
    },
    [propsOnChange],
  );

  return {
    onChange,
    validator: validatorValue,
  };
}
