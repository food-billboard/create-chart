import { useRef, useCallback } from 'react';
import { Row, Col, Button, Switch } from 'antd';
import { history } from 'umi';
import {
  SendOutlined,
  DeleteOutlined,
  FolderViewOutlined,
  DisconnectOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import {
  deleteScreen,
  previewScreen,
  shareScreen,
  closeShareScreen,
  enableScreen,
  disabledScreen,
} from '@/services';
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
  const { value } = props;

  const fetchLoading = useRef<boolean>(false);
  const shareSettingRef = useRef<ShareSettingRef>(null);

  // 启用 | 禁用
  const onEnabledChange = useCallback(
    async (target: API_SCREEN.TGetScreenListData, value) => {
      if (fetchLoading.current) return;
      // enableScreen
      // disabledScreen
    },
    [],
  );

  // 预览
  const previewScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    // previewScreen
  }, []);

  // 分享 | 取消分享
  const shareScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    const {
      share: { open },
    } = value;
    if (open) {
      // closeShareScreen
    } else {
      shareSettingRef.current?.open();
    }
  }, []);

  // 确定分享参数
  const onShareOk = useCallback((value) => {
    // shareScreen
  }, []);

  // 删除
  const deleteScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    // deleteScreen
  }, []);

  // 编辑
  const handleEdit = useCallback((value) => {
    const { id } = value;
    history.push({
      pathname: '/designer',
      state: {
        id,
      },
    });
  }, []);

  return (
    <div className={styles['screen-list-icon-content']}>
      <Row gutter={24}>
        {value.map((item) => {
          const { name, poster, id, share, enable } = item;
          return (
            <Col key={id} {...COL_SPAN} onClick={handleEdit.bind(null, item)}>
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
                        icon={
                          share.open ? <DisconnectOutlined /> : <SendOutlined />
                        }
                        title={share.open ? '取消分享' : '分享'}
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
