import {
  SendOutlined,
  DeleteOutlined,
  DesktopOutlined,
  CopyOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Row, Col, Button, Switch, App } from 'antd';
import classnames from 'classnames';
import { useRef, useCallback } from 'react';
import {
  deleteScreen,
  previewScreen,
  shareScreen,
  enableScreen,
  disabledScreen,
  copyScreen,
} from '@/services';
import { exportData } from '@/utils/Assist/LeadInAndOutput';
import { goDesign, goPreview } from '@/utils/tool';
import ShareSetting, { ShareSettingRef } from './ShareSetting';
import styles from './index.less';

const COL_SPAN = {
  xs: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 4,
};

const ScreenList = (props: {
  value: API_SCREEN.TGetScreenListData[];
  onChange?: () => any;
}) => {
  const { value, onChange } = props;

  const { message, modal } = App.useApp();

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

  // 编辑
  const handleEdit = useCallback((value) => {
    const { _id, enable } = value;
    if (enable) return;
    goDesign(_id);
  }, []);

  // 复制
  const copyScreenMethod = useCallback(
    async (value: any, e) => {
      e.stopPropagation();
      fetchLoading.current = true;
      try {
        const response: any = await copyScreen({
          _id: value._id,
          type: 'screen',
        });
        await onChange?.();
        modal.confirm({
          title: '提示',
          content: '复制成功，是否跳转编辑？',
          onOk: () => {
            handleEdit({ _id: response[0] });
          },
        });
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange, handleEdit],
  );

  // 预览
  const previewScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    fetchLoading.current = true;
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
    fetchLoading.current = true;
    shareSettingRef.current?.open(value._id);
  }, []);

  // 确定分享参数
  const onShareOk = useCallback(
    async (value) => {
      try {
        await shareScreen(value);
        onChange?.();
        message.success('操作成功');
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
      modal.confirm({
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

  // 导出
  const handleExport = useCallback(
    async (value: API_SCREEN.TGetScreenListData, e: any) => {
      e.stopPropagation();
      await exportData({
        type: 'screen',
        _id: value._id,
      });
    },
    [],
  );

  return (
    <div className={styles['screen-list-icon-content']}>
      <Row
        gutter={{
          xs: 12,
          sm: 24,
          md: 24,
        }}
      >
        {value.map((item) => {
          const { name, poster, _id, enable, description, flag } = item;
          return (
            <Col key={_id} {...COL_SPAN} onClick={handleEdit.bind(null, item)}>
              <div className={styles['screen-list-icon-content-item']}>
                <div
                  className={styles['screen-list-icon-content-item-wrapper']}
                >
                  <div className={styles['screen-list-icon-content-item-main']}>
                    <img src={poster} />
                    <div>
                      <Button
                        size="small"
                        type="link"
                        icon={<ExportOutlined />}
                        title="导出"
                        onClick={handleExport.bind(null, item)}
                      ></Button>
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
                </div>
                <div className={styles['screen-list-icon-content-item-footer']}>
                  <div
                    className={classnames(
                      styles['screen-list-icon-content-item-footer-name'],
                      'dis-flex',
                    )}
                    title={name}
                  >
                    <div className="text-ellipsis m-r-4">{name}</div>
                    <div
                      style={{
                        color: flag === 'H5' ? 'orange' : 'green',
                      }}
                    >
                      ({flag})
                    </div>
                  </div>
                  <div
                    className={classnames(
                      styles['screen-list-icon-content-item-footer-desc'],
                      'text-ellipsis',
                    )}
                  >
                    {description || '无任何描述~'}
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
                      icon={<DesktopOutlined />}
                      type="link"
                      onClick={previewScreenMethod.bind(null, item)}
                    >
                      预览
                    </Button>
                    <Button
                      size="small"
                      icon={<CopyOutlined />}
                      type="link"
                      onClick={copyScreenMethod.bind(null, item)}
                      style={{ paddingLeft: 0 }}
                    >
                      复制
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <ShareSetting
        onOk={onShareOk}
        onCancel={() => (fetchLoading.current = false)}
        onCancelShare={() => (fetchLoading.current = false)}
        ref={shareSettingRef}
      />
    </div>
  );
};

export default ScreenList;
