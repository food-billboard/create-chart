import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';
import { Button, Input, Popconfirm } from 'antd';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
import FocusModal from '@/components/FocusModal';
import LoadingButton from '@/components/LoadingButton';
import useService from '../../useService';
import styles from './index.less';

const ListItem = (props: {
  screen: string;
  value: API_IMPROVE.GetScreenShotListData;
  onUpdate: () => Promise<any>;
}) => {
  const { value, onUpdate, screen } = props;
  const { isUse, _id, createAt, description } = value;

  const {
    onUpdate: serviceUpdate,
    onDelete,
    onUse,
    onCover,
  } = useService({ screen });

  const [editable, setEditable] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description || '');

  const handleEdit = useCallback(() => {
    setEditable(true);
    setDescriptionValue(description || '');
  }, [description]);

  return (
    <>
      <div
        className={classnames(
          styles['screen-shot-list-item'],
          'dis-flex p-8 m-b-8 over-hide',
        )}
      >
        <div
          className={classnames(
            'over-hide f-1',
            styles['screen-shot-list-item-content'],
          )}
        >
          <div style={isUse ? { color: 'var(--primary-color)' } : {}}>
            {createAt}
          </div>
          <div
            title={description}
            className={classnames('text-ellipsis', {
              [styles['screen-shot-list-item-content-des-empty']]: !description,
            })}
          >
            {description || '可输入描述'}
          </div>
        </div>
        <div className={styles['screen-shot-list-item-action']}>
          <Button
            onClick={handleEdit}
            type="link"
            icon={<EditOutlined />}
            title="编辑"
            size="middle"
          />
          <Popconfirm
            title="是否确认删除"
            onConfirm={() => onDelete({ _id }, onUpdate)}
          >
            <Button
              disabled={isUse}
              type="link"
              icon={<DeleteOutlined />}
              title="删除"
              size="middle"
            />
          </Popconfirm>
          <LoadingButton
            onClick={onUse.bind(null, { _id }, onUpdate)}
            type="link"
            icon={<CheckCircleOutlined />}
            title="使用"
            size="middle"
            disabled={isUse}
          />
          <Popconfirm
            title="将使用最新的大屏数据覆盖当前快照，是否确认？"
            onConfirm={() => onCover({ _id }, onUpdate)}
          >
            <Button
              type="link"
              icon={<CloudSyncOutlined />}
              title="覆盖当前快照"
              size="middle"
            />
          </Popconfirm>
        </div>
      </div>
      <FocusModal
        title="修改描述"
        open={editable}
        onCancel={() => setEditable(false)}
        onOk={() => {
          serviceUpdate({ _id, value: descriptionValue }, onUpdate);
          setEditable(false);
        }}
      >
        <Input.TextArea
          rows={3}
          maxLength={100}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
      </FocusModal>
    </>
  );
};

export default ListItem;
