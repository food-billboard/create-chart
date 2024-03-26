import {
  DeleteOutlined,
  DesktopOutlined,
  ExportOutlined,
  BranchesOutlined,
} from '@ant-design/icons';
import { Row, Col, Button, Switch, App, Modal } from 'antd';
import classnames from 'classnames';
import { useRef, useCallback } from 'react';
import {
  deleteScreenModel,
  previewScreenModel,
  enableScreenModel,
  disabledScreenModel,
  copyScreen,
} from '@/services';
import { exportData } from '@/utils/Assist/LeadInAndOutput';
import { goDesignModel, goPreviewModel, goDesign } from '@/utils/tool';
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

  // 启用 | 禁用
  const onEnabledChange = useCallback(
    async (target: API_SCREEN.TGetScreenListData, value, e) => {
      e.stopPropagation();
      if (fetchLoading.current) return;
      try {
        if (value) {
          await enableScreenModel({ _id: target._id });
        } else {
          await disabledScreenModel({ _id: target._id });
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
    goDesignModel(_id);
  }, []);

  // 预览
  const previewScreenMethod = useCallback(async (value, e) => {
    e.stopPropagation();
    if (fetchLoading.current) return;
    fetchLoading.current = true;
    try {
      await previewScreenModel({ _id: value._id });
      goPreviewModel(value._id);
    } catch (err) {
      message.info('操作失败');
    } finally {
      fetchLoading.current = false;
    }
  }, []);

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
            await deleteScreenModel({
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

  // 模板使用
  const useModelMethod = useCallback(
    async (value: any, e) => {
      e.stopPropagation();
      fetchLoading.current = true;
      try {
        const response: any = await copyScreen({
          _id: value._id,
          type: 'model',
        });
        goDesign(response[0]);
      } catch (err) {
        message.info('操作失败');
      } finally {
        fetchLoading.current = false;
      }
    },
    [onChange, handleEdit],
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
                    {enable && (
                      <Button
                        size="small"
                        icon={<BranchesOutlined />}
                        type="link"
                        onClick={useModelMethod.bind(null, item)}
                      >
                        使用
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ScreenList;
