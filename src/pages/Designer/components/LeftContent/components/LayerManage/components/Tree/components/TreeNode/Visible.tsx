import { useCallback, useMemo } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const VisibleEditor = (props: {
  visible: boolean;
  onChange: (value: SuperPartial<ComponentData.TComponentData>) => void;
}) => {
  const { visible, onChange } = props;

  const changeVisible = useCallback(
    (e) => {
      e.stopPropagation();

      onChange({
        config: {
          attr: {
            visible: !visible,
          },
        },
      });
    },
    [visible, onChange],
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
