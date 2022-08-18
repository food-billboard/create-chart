import { useMemo, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { connect } from 'dva';
import classnames from 'classnames';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const THUMB_WIDTH = 300;

const ComponentItem = (props: {
  width: number;
  height: number;
  left: number;
  top: number;
  id: string;
  scale: number;
}) => {
  return <div></div>;
};

const InternalPanelThumb = (props: {
  width: number;
  height: number;
  components: ComponentData.TComponentData[];
}) => {
  const { width, height, components } = props;

  const thumbHeight = useMemo(() => {
    return (height / width) * THUMB_WIDTH;
  }, [width, height]);

  const scale = useMemo(() => {
    return THUMB_WIDTH / width;
  }, [width]);

  const componentList = useMemo(() => {
    return components.map((item) => {
      const {
        id,
        config: {
          style: { width, height, left, top },
        },
      } = item;
      return (
        <ComponentItem
          width={width}
          height={height}
          left={left}
          top={top}
          scale={scale}
          id={id}
        />
      );
    });
  }, [components, scale]);

  return (
    <div
      className={classnames(styles['designer-panel-thumb'], 'pos-re')}
      style={{
        width: THUMB_WIDTH,
        height: thumbHeight,
      }}
    >
      {componentList}
    </div>
  );
};

const PanelThumb = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InternalPanelThumb);

const ThumbButton = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const icon = useMemo(() => {
    return visible ? <MinusSquareOutlined /> : <PlusSquareOutlined />;
  }, [visible]);

  return (
    <Tooltip
      title={<PanelThumb />}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button type="link" icon={icon}></Button>
    </Tooltip>
  );
};

export default ThumbButton;
