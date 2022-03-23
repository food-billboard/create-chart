import { useRef, useCallback } from 'react';
import { Row, Col, Button, Switch, message, Modal } from 'antd';
import { history } from 'umi';
import {
  SendOutlined,
  DeleteOutlined,
  FolderViewOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import {
  deleteScreen,
  previewScreen,
  shareScreen,
  enableScreen,
  disabledScreen,
} from '@/services';
import { goDesign, goPreview } from '@/utils/tool';
import ShareSetting, { ShareSettingRef } from './ShareSetting';
import styles from './index.less';

const COL_SPAN = {
  xs: 6,
  lg: 4,
};

const ScreenList = (props: {
  value: API_SCREEN.TGetScreenListData[];
  onChange?: () => any;
}) => {
  const { value, onChange } = props;

  const fetchLoading = useRef<boolean>(false);
  const shareSettingRef = useRef<ShareSettingRef>(null);

  // 启用 | 禁用
  const onEnabledChange = useCallback(
    async (target: API_SCREEN.TGetScreenListData, value, e) => {
      e.stopPropagation();
      if (fetchLoading.current) return;
      try {
        if (value) {
          await enableScreen({ _id: target._id });
        } else {
          await disabledScreen({ _id: target._id });
        }
        onChange?.();
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange],
  );

  // 预览
  const previewScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    try {
      await previewScreen({ _id: value._id });
      goPreview(value._id);
    } catch (err) {
      message.info('操作失败');
    } finally {
      fetchLoading.current = false;
    }
  }, []);

  // 分享
  const shareScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    shareSettingRef.current?.open(value._id);
  }, []);

  // 确定分享参数
  const onShareOk = useCallback(
    async (value) => {
      try {
        await shareScreen(value);
        onChange?.();
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange],
  );

  // 删除
  const deleteScreenMethod = useCallback(
    async (value, e) => {
      e.stopPropagation();
      if (fetchLoading.current) return;
      Modal.confirm({
        title: '提示',
        content: '是否确定删除？',
        onOk: async () => {
          try {
            await deleteScreen({
              _id: value._id,
            });
            onChange?.();
          } catch (err) {
            message.info('操作失败');
          } finally {
            fetchLoading.current = false;
          }
        },
      });
    },
    [onChange],
  );

  // 编辑
  const handleEdit = useCallback((value) => {
    const { _id } = value;
    goDesign(_id);
  }, []);

  return (
    <div className={styles['screen-list-icon-content']}>
      <Row gutter={24}>
        {value.map((item) => {
          const { name, poster, _id, enable } = item;
          return (
            <Col key={_id} {...COL_SPAN} onClick={handleEdit.bind(null, item)}>
              <div className={styles['screen-list-icon-content-item']}>
                <div
                  className={styles['screen-list-icon-content-item-main']}
                  style={{
                    backgroundImage: `url(${poster})`,
                  }}
                >
                  <div>
                    {enable && (
                      <Button
                        size="small"
                        type="link"
                        icon={<SendOutlined />}
                        title={'分享'}
                        onClick={shareScreenMethod.bind(null, item)}
                      ></Button>
                    )}
                    {!enable && (
                      <Button
                        size="small"
                        type="link"
                        icon={<DeleteOutlined />}
                        title="删除"
                        onClick={deleteScreenMethod.bind(null, item)}
                      ></Button>
                    )}
                  </div>
                </div>
                <div className={styles['screen-list-icon-content-item-footer']}>
                  <div
                    className={classnames(
                      styles['screen-list-icon-content-item-footer-name'],
                      'text-ellipsis',
                    )}
                    title={name}
                  >
                    {name}
                  </div>
                  <div
                    className={
                      styles['screen-list-icon-content-item-footer-action']
                    }
                  >
                    <Switch
                      className={
                        enable
                          ? ''
                          : styles[
                              'screen-list-icon-content-item-footer-action-switch-close'
                            ]
                      }
                      checkedChildren="启用"
                      unCheckedChildren="禁用"
                      size="small"
                      checked={enable}
                      onChange={onEnabledChange.bind(null, item)}
                    />
                    <Button
                      size="small"
                      icon={<FolderViewOutlined />}
                      type="link"
                      onClick={previewScreenMethod.bind(null, item)}
                    >
                      预览
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <ShareSetting onOk={onShareOk} ref={shareSettingRef} />
    </div>
  );
};

export default ScreenList;