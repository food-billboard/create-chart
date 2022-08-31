import { useCallback } from 'react';
import { Button } from 'antd';
import { InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import GlobalComponent from '@/utils/Assist/GlobalComponent';
import IconTooltip from '@/components/IconTooltip';
import {
  IFRAME_COMPONENT_ON_MESSAGE_CODE_EXAMPLE,
  IFRAME_COMPONENT_POST_MESSAGE_CODE_EXAMPLE,
} from '@/utils/constants';
import styles from './index.less';

export const OnMessageTooltip = () => {
  const handleDownLoad = useCallback(async (e) => {
    e.stopPropagation();
    return saveAs(
      new Blob([IFRAME_COMPONENT_POST_MESSAGE_CODE_EXAMPLE]),
      'example.js',
    );
  }, []);

  return (
    <IconTooltip
      title={
        <div className={styles['component-iframe-message-tooltip']}>
          iframe页面数据发生改变会通知当前页面。
          <Button
            onClick={handleDownLoad}
            type="link"
            icon={<DownloadOutlined />}
          >
            点击下载ifrmae数据发送示例代码
          </Button>
        </div>
      }
    >
      <InfoCircleOutlined className="m-l-4" />
    </IconTooltip>
  );
};

export const OnMessageTooltipName = 'CHART_COMPONENT_OTHER_IFRAME_ON_MESSAGE';

GlobalComponent.register(OnMessageTooltipName, OnMessageTooltip);

export const PostMessageTooltip = () => {
  const handleDownLoad = useCallback(async () => {
    return saveAs(
      new Blob([IFRAME_COMPONENT_ON_MESSAGE_CODE_EXAMPLE]),
      'example.js',
    );
  }, []);

  return (
    <IconTooltip
      title={
        <div className={styles['component-iframe-message-tooltip']}>
          选中的参数在数据发生改变时均会通知iframe页面。
          <Button
            onClick={handleDownLoad}
            type="link"
            icon={<DownloadOutlined />}
          >
            点击下载ifrmae数据接收示例代码
          </Button>
        </div>
      }
    >
      <InfoCircleOutlined />
    </IconTooltip>
  );
};
