import { Row, Col } from 'antd';
import classnames from 'classnames';
import Color from 'color';
import React from 'react';
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
  onChange?: (value: string[]) => void;
}) => {
  const span = parseInt((24 / value.length).toFixed(0));

  return (
    <Row
      gutter={24}
      className={classnames(
        {
          [styles['designer-theme-config-list-check']]: checked,
        },
        styles['designer-theme-config-list'],
      )}
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
                onChange?.(newColor);
              }}
            >
              {children}
            </ColorSelect>
          );
        }
        return children;
      })}
    </Row>
  );
};

export default ColorItem;
