import Select from '../Select';

const { Option } = Select;

const LINE_STYLE_MAP = [
  {
    label: 'linear',
    value: 'linear',
  },
  {
    label: 'quadraticIn',
    value: 'quadraticIn',
  },
  {
    label: 'quadraticOut',
    value: 'quadraticOut',
  },
  {
    label: 'quadraticInOut',
    value: 'quadraticInOut',
  },
  {
    label: 'cubicIn',
    value: 'cubicIn',
  },
  {
    label: 'cubicOut',
    value: 'cubicOut',
  },
  {
    label: 'cubicInOut',
    value: 'cubicInOut',
  },
  {
    label: 'quarticIn',
    value: 'quarticIn',
  },
  {
    label: 'quarticInOut',
    value: 'quarticInOut',
  },
  {
    label: 'quinticIn',
    value: 'quinticIn',
  },
  {
    label: 'quinticOut',
    value: 'quinticOut',
  },
  {
    label: 'quinticInOut',
    value: 'quinticInOut',
  },
  {
    label: 'sinusoidalIn',
    value: 'sinusoidalIn',
  },
  {
    label: 'sinusoidalOut',
    value: 'sinusoidalOut',
  },
  {
    label: 'sinusoidalInOut',
    value: 'sinusoidalInOut',
  },
  {
    label: 'exponentialIn',
    value: 'exponentialIn',
  },
  {
    label: 'exponentialOut',
    value: 'exponentialOut',
  },
  {
    label: 'exponentialInOut',
    value: 'exponentialInOut',
  },
  {
    label: 'circularIn',
    value: 'circularIn',
  },
  {
    label: 'circularOut',
    value: 'circularOut',
  },
  {
    label: 'circularInOut',
    value: 'circularInOut',
  },
  {
    label: 'elasticIn',
    value: 'elasticIn',
  },
  {
    label: 'elasticOut',
    value: 'elasticOut',
  },
  {
    label: 'elasticInOut',
    value: 'elasticInOut',
  },
  {
    label: 'backIn',
    value: 'backIn',
  },
  {
    label: 'backOut',
    value: 'backOut',
  },
  {
    label: 'backInOut',
    value: 'backInOut',
  },
  {
    label: 'bounceIn',
    value: 'bounceIn',
  },
  {
    label: 'bounceOut',
    value: 'bounceOut',
  },
  {
    label: 'bounceInOut',
    value: 'bounceInOut',
  },
];

const ChartAnimationTypeSelect = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      onChange={onChange}
      className="w-100"
      options={LINE_STYLE_MAP}
    />
  );
};

export default ChartAnimationTypeSelect;
