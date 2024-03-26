import { Input, Row, Col } from 'antd';
import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import Modal from '@/components/FocusModal';
import BorderMap from '../Border';
import { InternalBorderWrapper } from '../BorderRender';
import styles from './index.less';

const BorderSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value = '', onChange } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const options = useMemo(() => {
    return Object.entries(BorderMap).map((item) => {
      const [key, { title, value }] = item;
      return {
        label: title,
        value: key,
        component: value,
      };
    });
  }, []);

  const targetData = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [options, value]);

  const handleOpen = useCallback(() => {
    setModalVisible(true);
  }, [value]);

  const onOk = useCallback(({ value }) => {
    onChange?.(value);
    setModalVisible(false);
  }, []);

  const onCancel = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <Input
        onClick={handleOpen}
        className="w-100"
        value={targetData?.label}
        placeholder="选择边框"
      />
      <Modal
        open={modalVisible}
        title="选择边框"
        onCancel={onCancel}
        footer={null}
      >
        <div className={styles['internal-border-modal-list']}>
          <Row gutter={24}>
            {options.map((item) => {
              const { label, value } = item;
              return (
                <Col
                  span={8}
                  key={value}
                  className={styles['internal-border-modal-list-item']}
                >
                  <div
                    className={classnames(
                      styles['internal-border-modal-list-item-main'],
                      'pos-re',
                    )}
                  >
                    <InternalBorderWrapper
                      border={{
                        show: true,
                        value,
                      }}
                    >
                      <div
                        onClick={onOk.bind(null, item)}
                        className="w-100 h-100"
                      ></div>
                    </InternalBorderWrapper>
                  </div>
                  <div
                    className={styles['internal-border-modal-list-item-label']}
                    onClick={onOk.bind(null, item)}
                  >
                    {label}
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Modal>
    </>
  );

  return (
    <Select
      className="w-100"
      value={value}
      onChange={onChange}
      options={Object.entries(BorderMap).map((item) => {
        const [key, { title }] = item;
        return {
          label: title,
          value: key,
        };
      })}
    />
  );
};

export default BorderSelect;
