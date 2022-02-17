import { useCallback, useMemo } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const VisibleEditor = (props: {
  visible: boolean;
  onChange: (value: SuperPartial<ComponentData.TComponentData>) => void;
  disabled?: boolean;
}) => {
  const { visible, onChange, disabled } = props;

  const changeVisible = useCallback(
    (e) => {
      e.stopPropagation();

      if (disabled) return;

      onChange({
        config: {
          attr: {
            visible: !visible,
          },
        },
      });
    },
    [visible, onChange, disabled],
  );

  // 显示隐藏
  const baseVisible = useMemo(() => {
    return visible ? (
      <EyeOutlined className="c-po" onClick={changeVisible} />
    ) : (
      <EyeInvisibleOutlined className="c-po" onClick={changeVisible} />
    );
  }, [visible, changeVisible]);

  return baseVisible;
};

export default VisibleEditor;
