import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { connect } from 'umi';
import Drawer from '@/components/FocusDrawer';
import LoadingButton from '@/components/LoadingButton';
import { MAX_SCREEN_SHOT_COUNT } from '@/utils/constants';
import ListItem from './components/ListItem';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';
import useService from './useService';

export type ScreenShotManageRef = {
  open: () => void;
};

export type ScreenShotManageProps = {
  _id: string;
};

// 大屏快照
const ScreenShotManage = forwardRef<ScreenShotManageRef, ScreenShotManageProps>(
  (props, ref) => {
    const { _id } = props;

    const [visible, setVisible] = useState(false);

    const { fetchData, dataSource, onAdd } = useService({ screen: _id });

    const count = dataSource.length;

    const title = useMemo(() => {
      return (
        <div>
          快照管理
          <span>{count}</span>个/还可创建
          <span>{MAX_SCREEN_SHOT_COUNT - count}</span>个
        </div>
      );
    }, [count]);

    const open = () => {
      setVisible(true);
      fetchData();
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
        };
      },
      [],
    );

    return (
      <Drawer title={title} open={visible} onClose={() => setVisible(false)}>
        <div className={styles['screen-shot-list']}>
          {dataSource.map((item) => {
            const { _id: shotId } = item;
            return (
              <ListItem
                key={shotId}
                value={item}
                onUpdate={fetchData}
                screen={_id}
              />
            );
          })}
        </div>
        <div className="ali-r">
          <LoadingButton
            disabled={count === MAX_SCREEN_SHOT_COUNT}
            type="primary"
            onClick={onAdd}
          >
            新增快照
          </LoadingButton>
        </div>
      </Drawer>
    );
  },
);

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true,
})(ScreenShotManage);
