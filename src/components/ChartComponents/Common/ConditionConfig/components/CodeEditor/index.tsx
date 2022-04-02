import { QuestionCircleOutlined } from '@ant-design/icons';
import CodeEditor from '@/components/CodeEditor';
import IconTooltip from '@/components/IconTooltip';
import ParamsSelect from '@/components/ParamsSelect';

type TValue = ComponentData.ComponentCondition['value']['code'];

const ConditionCodeEditor = (props: {
  value: TValue;
  onChange: (value: TValue) => void;
}) => {
  const { value, onChange } = props;

  return (
    <div className="design-config-format-font-size c-f-s">
      <p className="m-t-4">
        全局参数
        <IconTooltip title="可响应式更新数据" iconStyle={{ marginLeft: 0 }}>
          <QuestionCircleOutlined />
        </IconTooltip>
        {' ：'}
      </p>
      <div className="p-lr-8">
        <ParamsSelect
          value={value?.relation || []}
          onChange={(relation) => {
            onChange({
              ...value,
              relation,
            });
          }}
          className="m-t-4 m-b-8"
        />
      </div>

      <p>{'function filter( data ) {'}</p>
      <CodeEditor
        language="javascript"
        width={360}
        height={180}
        value={value?.code ?? ''}
        onChange={(code) => {
          onChange({
            ...value,
            code,
          });
        }}
      />
      <p>{'}'}</p>
    </div>
  );
};

export default ConditionCodeEditor;
