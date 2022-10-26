import React from 'react';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import styles from './index.less';

const ColorItem = ({
  value,
  checked,
  name,
  onClick,
}: {
  value: string[];
  checked: boolean;
  name: string;
  onClick: (name: string) => void;
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
      onClick={onClick.bind(null, name)}
    >
      {value.map((item, index) => {
        return (
          <Col span={span} key={index}>
            <div
              className={styles['designer-theme-config-item']}
              style={{
                backgroundColor: item,
              }}
            ></div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ColorItem;
