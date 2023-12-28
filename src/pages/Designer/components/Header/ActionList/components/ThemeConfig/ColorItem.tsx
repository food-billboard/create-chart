import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Button, Popconfirm, Input, message } from 'antd';
import classnames from 'classnames';
import Color from 'color';
import { useCallback, useState } from 'react';
import ColorSelect from '@/components/ColorSelect';
import { getHexString } from '@/utils/Assist/Theme';
import styles from './index.less';

const ColorItem = ({
  value,
  checked,
  name,
  onClick,
  editable = false,
  onChange,
}: {
  value: string[];
  checked: boolean;
  name: string;
  onClick?: (name: string) => void;
  editable?: boolean;
  onChange?: (
    value: Partial<{
      value: string[];
      isDelete: boolean;
      originLabel: string;
      label: string;
    }>,
  ) => void;
}) => {
  const span = Math.floor(24 / value.length);
  const prefixSpan = 24 - span * value.length;

  const [themeName, setThemeName] = useState('');

  const onEditConfirm = useCallback(() => {
    if (themeName === name) return;
    if (!themeName) {
      message.info('主题名称不能为空');
      return;
    }
    onChange?.({
      originLabel: name,
      label: themeName,
    });
  }, [themeName, name, onChange]);

  const onEditOpenChange = useCallback(
    (open) => {
      if (open) {
        setThemeName(name);
      }
    },
    [name],
  );

  const handleDelete = useCallback(() => {
    onChange?.({
      isDelete: true,
    });
  }, [onChange]);

  return (
    <div
      className={classnames(
        'flex-al-cen dis-flex',
        {
          [styles['designer-theme-config-list-check']]: checked,
        },
        styles['designer-theme-config-list'],
      )}
    >
      <Row
        gutter={24}
        className={'f-1'}
        key={name}
        onClick={onClick?.bind(null, name)}
      >
        {value.map((item, index) => {
          const children = (
            <Col span={span} key={index}>
              <div
                className={styles['designer-theme-config-item']}
                style={{
                  backgroundColor: item,
                }}
              ></div>
            </Col>
          );
          if (editable) {
            const realValue = Color(item).object();
            return (
              <ColorSelect
                key={index}
                value={{
                  ...(realValue as ComponentData.TColorConfig),
                  a: realValue.alpha || 1,
                }}
                onChange={(newValue) => {
                  const color = getHexString(
                    newValue as ComponentData.TColorConfig,
                    true,
                  );
                  const newColor = [...value];
                  newColor.splice(index, 1, color);
                  onChange?.({
                    value: newColor,
                  });
                }}
                closeOnChangeComplete
              >
                {children}
              </ColorSelect>
            );
          }
          return children;
        })}
        {!!prefixSpan && <Col span={prefixSpan}></Col>}
      </Row>
      <div className="p-l-8">
        <Popconfirm
          title="编辑主题名称"
          description={
            <>
              <Input
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
              />
              <span style={{ opacity: 0.6 }}>避免名称重复</span>
            </>
          }
          onOpenChange={onEditOpenChange}
          onConfirm={onEditConfirm}
        >
          <Button
            type="link"
            icon={<EditOutlined />}
            title="编辑主题名称"
            disabled={!editable}
          />
        </Popconfirm>
        <Popconfirm
          title="提示"
          description="是否确认删除该自定义主题"
          onConfirm={handleDelete}
        >
          <Button
            type="link"
            icon={<DeleteOutlined />}
            title="删除主题"
            disabled={!editable}
          />
        </Popconfirm>
      </div>
    </div>
  );
};

export default ColorItem;
