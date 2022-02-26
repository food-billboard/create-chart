import {} from 'react';
import {
  PicCenterOutlined,
  PicLeftOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import IconTooltip from '@/components/IconTooltip';
import styles from './index.less';

export const PositionConfig = (props: {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}) => {
  const [value, setValue] = useControllableValue<string>(props, {
    defaultValue: 'center',
  });

  return (
    <div>
      <Space size={3}>
        <IconTooltip title="居中">
          <Button
            type="default"
            ghost
            icon={<PicCenterOutlined />}
            onClick={setValue.bind(null, 'center')}
            className={classnames({
              [styles['design-config-position-config-active']]:
                value === 'center',
            })}
          ></Button>
        </IconTooltip>
        <IconTooltip title="居左">
          <Button
            type="default"
            ghost
            icon={<PicLeftOutlined />}
            onClick={setValue.bind(null, 'left')}
            className={classnames({
              [styles['design-config-position-config-active']]:
                value === 'left',
            })}
          ></Button>
        </IconTooltip>
        <IconTooltip title="居右">
          <Button
            type="default"
            ghost
            icon={<PicRightOutlined />}
            onClick={setValue.bind(null, 'right')}
            className={classnames({
              [styles['design-config-position-config-active']]:
                value === 'right',
            })}
          ></Button>
        </IconTooltip>
      </Space>
    </div>
  );
};
