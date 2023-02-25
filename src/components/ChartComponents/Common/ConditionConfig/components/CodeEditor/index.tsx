import CodeEditor from '@/components/CodeEditor';
import ParamsSelect from '@/components/ParamsSelect';

type TValue = ComponentData.ComponentCondition['value']['code'];

const ConditionCodeEditor = (props: {
  value: TValue;
  onChange: (value: TValue) => void;
}) => {
  const { value, onChange } = props;

  return (
    <div className="design-config-format-font-size c-f-s p-lr-8 m-tb-4">
      <div>
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

      <p>{'function condition( data ) {'}</p>
      <CodeEditor
        language="javascript"
        action={['copy', 'full-screen']}
        width={280}
        height={180}
        defaultValue={value?.code ?? ''}
        onBlur={(code: any) => {
          onChange({
            ...value,
            code,
          });
        }}
        fullScreenAction={false}
      />
      <p>{'}'}</p>
    </div>
  );
};

export default ConditionCodeEditor;
