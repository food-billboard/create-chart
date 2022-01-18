import { useCallback, useMemo, useState } from 'react';
import { Collapse, Input } from 'antd';
import {
  DragOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {
  SortableElement as RcSortableElement,
  SortableHandle as RcSortableHandle,
} from 'react-sortable-hoc';
import { connect } from 'dva';
import classnames from 'classnames';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { Panel } = Collapse;

const DragHandle = RcSortableHandle(() => <DragOutlined className="c-po" />);

const ListItem = RcSortableElement(
  ({
    value,
    setComponent,
  }: {
    value: ComponentData.TComponentData;
    setComponent?: ComponentMethod.SetComponentMethod;
  }) => {
    const {
      type,
      name,
      config: {
        attr: { visible, lock },
      },
    } = value;

    const [editable, setEditable] = useState<boolean>(false);

    const changeVisible = useCallback(() => {}, [visible]);

    const changeLock = useCallback(() => {}, [lock]);

    const changeName = useCallback((e) => {
      const newName = e.target.value;
      setEditable(false);
    }, []);

    const baseVisible = useMemo(() => {
      return visible ? (
        <EyeOutlined className="c-po" onClick={changeVisible} />
      ) : (
        <EyeInvisibleOutlined className="c-po" onClick={changeVisible} />
      );
    }, [visible, changeVisible]);

    const baseNameEdit = useMemo(() => {
      return editable ? (
        <Input defaultValue={name} onBlur={changeName} />
      ) : (
        <div
          onClick={() => setEditable(true)}
          className={classnames('c-po', styles['design-page-layer-item-name'])}
        >
          {name}
        </div>
      );
    }, [editable, name, changeName]);

    const baseLock = useMemo(() => {
      return lock ? (
        <LockOutlined onClick={changeLock} className="c-po" />
      ) : (
        <UnlockOutlined onClick={changeLock} className="c-po" />
      );
    }, [lock, changeLock]);

    const normalComponentLayer = useMemo(() => {
      return (
        <div className={styles['design-page-layer-item']}>
          {baseVisible}
          {baseNameEdit}
          <div>
            <DragHandle />
            {baseLock}
          </div>
        </div>
      );
    }, [changeVisible, baseNameEdit, editable]);

    const groupComponentLayer = useMemo(() => {
      return <Collapse></Collapse>;
    }, []);

    if (type === ComponentData.ETComponentType.COMPONENT) {
      return normalComponentLayer;
    }

    return groupComponentLayer;
  },
);

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
