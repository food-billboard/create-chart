import {} from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';
import HalfForm from '../Common/Structure/HalfForm';
import ConfigList from '../Common/Structure/ConfigList';

const { Item } = ConfigList;

const GlobalConfig = () => {
  return (
    <div>
      <ConfigList>
        <Item label="屏幕大小">
          <HalfForm label="宽度">
            <InputNumber />
          </HalfForm>
          <HalfForm label="高度">
            <InputNumber />
          </HalfForm>
        </Item>
      </ConfigList>
    </div>
  );
};

export default GlobalConfig;
