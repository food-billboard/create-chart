import { Select } from 'antd';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    key: 'linear',
    value: 'linear',
  },
  {
    key: 'quadraticIn',
    value: 'quadraticIn',
  },
  {
    key: 'quadraticOut',
    value: 'quadraticOut',
  },
  {
    key: 'quadraticInOut',
    value: 'quadraticInOut',
  },
  {
    key: 'cubicIn',
    value: 'cubicIn',
  },
  {
    key: 'cubicOut',
    value: 'cubicOut',
  },
  {
    key: 'cubicInOut',
    value: 'cubicInOut',
  },
  {
    key: 'quarticIn',
    value: 'quarticIn',
  },
  {
    key: 'quarticInOut',
    value: 'quarticInOut',
  },
  {
    key: 'quinticIn',
    value: 'quinticIn',
  },
  {
    key: 'quinticOut',
    value: 'quinticOut',
  },
  {
    key: 'quinticInOut',
    value: 'quinticInOut',
  },
  {
    key: 'sinusoidalIn',
    value: 'sinusoidalIn',
  },
  {
    key: 'sinusoidalOut',
    value: 'sinusoidalOut',
  },
  {
    key: 'sinusoidalInOut',
    value: 'sinusoidalInOut',
  },
  {
    key: 'exponentialIn',
    value: 'exponentialIn',
  },
  {
    key: 'exponentialOut',
    value: 'exponentialOut',
  },
  {
    key: 'exponentialInOut',
    value: 'exponentialInOut',
  },
  {
    key: 'circularIn',
    value: 'circularIn',
  },
  {
    key: 'circularOut',
    value: 'circularOut',
  },
  {
    key: 'circularInOut',
    value: 'circularInOut',
  },
  {
    key: 'elasticIn',
    value: 'elasticIn',
  },
  {
    key: 'elasticOut',
    value: 'elasticOut',
  },
  {
    key: 'elasticInOut',
    value: 'elasticInOut',
  },
  {
    key: 'backIn',
    value: 'backIn',
  },
  {
    key: 'backOut',
    value: 'backOut',
  },
  {
    key: 'backInOut',
    value: 'backInOut',
  },
  {
    key: 'bounceIn',
    value: 'bounceIn',
  },
  {
    key: 'bounceOut',
    value: 'bounceOut',
  },
  {
    key: 'bounceInOut',
    value: 'bounceInOut',
  },
];

const ChartAnimationTypeSelect = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Select value={value} onChange={onChange} className="w-100">
      {LINE_STYLE_MAP.map((item) => {
        const { key, value } = item;
        return (
          <Option key={value} value={value}>
            {key}
          </Option>
        );
      })}
    </Select>
  );
};

export default ChartAnimationTypeSelect;
