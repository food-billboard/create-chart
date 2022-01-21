import { useCallback, useMemo, useState, useRef } from 'react';
import { Input, Space } from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import classnames from 'classnames';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const ListItem = ({
  value,
  setComponent: propsSetComponent,
  select,
  setSelect,
  path,
  update,
}: {
  value: ComponentData.TComponentData;
  setComponent?: ComponentMethod.SetComponentMethod;
  select: string[];
  setSelect: (value: string[]) => void;
  path: string;
  update?: () => void;
}) => {
  const {
    id,
    name,
    config: {
      attr: { visible, lock },
    },
  } = value;

  const [editable, setEditable] = useState<boolean>(false);

  const editTimestamps = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const setComponent = useCallback(
    (value: any) => {
      propsSetComponent?.(value);
      update?.();
    },
    [propsSetComponent],
  );

  const changeVisible = useCallback(
    (e) => {
      e.stopPropagation();

      setComponent?.({
        value: {
          config: {
            attr: {
              visible: !visible,
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    },
    [visible, id, setComponent, path],
  );

  const changeLock = useCallback(
    (e) => {
      e.stopPropagation();
      setComponent?.({
        value: {
          config: {
            attr: {
              lock: !lock,
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    },
    [lock, id, setComponent, path],
  );

  const changeName = useCallback(
    (e) => {
      const newName = e.target.value || name;
      setEditable(false);
      setComponent?.({
        value: {
          name: newName,
        },
        id,
        path,
        action: 'update',
      });
    },
    [setComponent, id, name],
  );

  const changeSelect = useCallback(() => {
    const index = select.indexOf(id);
    let newSelect: string[] = [];
    if (!!~index) {
      newSelect = [];
    } else {
      newSelect = [id];
    }
    setSelect(newSelect);
  }, [id, select, setSelect]);

  const changeEditState = useCallback(
    (e) => {
      e.stopPropagation();
      // dbClick
      if (Date.now() - editTimestamps.current < 200) {
        setEditable(true);
        editTimestamps.current = 0;
        clearTimeout(timerRef.current as any);
      }
      // click
      else {
        timerRef.current = setTimeout(() => {
          changeSelect();
          editTimestamps.current = 0;
        }, 200);
        editTimestamps.current = Date.now();
      }
    },
    [changeSelect],
  );

  // 显示隐藏
  const baseVisible = useMemo(() => {
    return visible ? (
      <EyeOutlined className="c-po" onClick={changeVisible} />
    ) : (
      <EyeInvisibleOutlined className="c-po" onClick={changeVisible} />
    );
  }, [visible, changeVisible]);

  // 名称修改
  const baseNameEdit = useMemo(() => {
    return editable ? (
      <Input defaultValue={name} onBlur={changeName} autoFocus />
    ) : (
      <div
        onClick={changeEditState}
        className={classnames(
          'c-po',
          styles['design-page-layer-item-name-basic'],
        )}
      >
        {name}
      </div>
    );
  }, [editable, name, changeName, changeEditState]);

  const baseLock = useMemo(() => {
    return lock ? (
      <LockOutlined onClick={changeLock} className="c-po" />
    ) : (
      <UnlockOutlined onClick={changeLock} className="c-po" />
    );
  }, [lock, changeLock]);

  return (
    <div className={classnames(styles['design-page-layer-item'], 'dis-flex')}>
      <div className={classnames(styles['design-page-layer-item-name'])}>
        {baseNameEdit}
      </div>
      <div
        className={classnames(
          styles['design-page-layer-item-action'],
          'dis-flex',
        )}
      >
        <Space size="large">
          {baseVisible}
          {baseLock}
        </Space>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
