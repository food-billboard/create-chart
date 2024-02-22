import { Button, Typography } from 'antd';
import classnames from 'classnames';
import { useState, useMemo } from 'react';
import IconFont from '@/components/ChartComponents/Common/Icon';
import { ScreenTooltip } from '@/components/Tooltip';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import { KEY_PRESS_MAP } from '@/utils/constants/another';
import { Tooltip } from '../PanelThumb';
import styles from './index.less';

const ShortcutKeys = () => {
  const [visible, setVisible] = useState(false);

  const element = useMemo(() => {
    return Object.entries(KEY_PRESS_MAP).map((item) => {
      const [keyCode, label] = item;
      return (
        <div
          className={classnames(styles['shortcut-keys-item'], 'dis-flex m-b-4')}
          key={keyCode}
        >
          <span className="text-ellipsis">{label}</span>
          <Typography.Text className="text-ellipsis" code>
            {keyCode}
          </Typography.Text>
        </div>
      );
    });
  }, []);

  return (
    <div className={classnames(styles['shortcut-keys-wrapper'], 'pos-re')}>
      <Tooltip
        visible={visible}
        uniqueKey="shortcut"
        onHide={setVisible.bind(null, false)}
        color={DEFAULT_THEME_COLOR}
      >
        <div className={classnames(styles['shortcut-keys'], 'c-f-s p-4')}>
          {element}
        </div>
      </Tooltip>
      <ScreenTooltip title="快捷键">
        <Button
          type="link"
          icon={<IconFont title="快捷键" type="icon-keyborad" />}
          onClick={setVisible.bind(null, !visible)}
        ></Button>
      </ScreenTooltip>
    </div>
  );
};

export default ShortcutKeys;
