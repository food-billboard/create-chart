import { useCallback, useMemo } from 'react';
import { Button } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { useScroll } from 'ahooks';
import classnames from 'classnames';
import { useMobxContext } from '@/hooks';
import ColorSelect from '@/components/ColorSelect';
import Tooltip from '@/components/Tooltip';
import ThemeUtil from '@/utils/Assist/Theme';
import { wrapperId } from '../../constants';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const GuideLineButton = (props: {
  show: boolean;
  onClick?: any;
  setGuideLine: (value: ComponentData.TGuideLineConfig) => void;
}) => {
  const { show, onClick, setGuideLine } = props;

  const {
    global: {
      screenData: {
        config: {
          attr: { theme },
        },
      },
    },
  } = useMobxContext();

  const { left, top } = useScroll(document.querySelector(`#${wrapperId}`)) || {
    left: 0,
    top: 0,
  };

  const guideLineShowIcon = useMemo(() => {
    return show ? <EyeOutlined /> : <EyeInvisibleOutlined />;
  }, [show]);

  const deleteGuideLine = useCallback(() => {
    setGuideLine({
      show,
      value: [],
    });
  }, [show, setGuideLine]);

  const title = useMemo(() => {
    return (
      <>
        <Button
          onClick={deleteGuideLine}
          icon={<DeleteOutlined />}
          type="link"
          title="删除所有辅助线"
        />
      </>
    );
  }, []);

  return (
    <Tooltip title={title}>
      <Button
        onClick={onClick}
        type="link"
        className={classnames('pos-ab', styles['designer-page-main-guide-btn'])}
        style={{
          left,
          top,
          backgroundColor: getRgbaString(
            ThemeUtil.generateNextColor4CurrentTheme(0),
          ),
        }}
        icon={guideLineShowIcon}
      ></Button>
    </Tooltip>
  );
};

export default observer(GuideLineButton);
