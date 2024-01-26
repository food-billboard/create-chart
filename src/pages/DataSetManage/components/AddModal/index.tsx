import { Row, Col } from 'antd';
import classnames from 'classnames';
import { useCallback, useRef } from 'react';
import ButtonModal, { ButtonModalRef } from '@/components/ButtonModal';
import { usePrimaryColor } from '@/hooks';
import { DATA_SET_TYPE_MAP } from '@/utils/constants';
import styles from './index.less';

const AddModal = ({ onChange }: { onChange: (value: string) => void }) => {
  const primaryColor = usePrimaryColor();

  const buttonModalRef = useRef<ButtonModalRef>(null);

  const handleSelect = useCallback(
    (value) => {
      onChange(value);
      buttonModalRef.current?.visibleChange(false);
    },
    [onChange],
  );

  return (
    <ButtonModal
      buttonChildren="新增"
      modalProps={{
        title: '选择数据集类型',
        footer: null,
        width: 700,
      }}
      ref={buttonModalRef}
    >
      <Row
        gutter={24}
        className={styles['data-set-add-modal']}
        style={{
          // @ts-ignore
          '--primary-color': primaryColor,
        }}
      >
        {DATA_SET_TYPE_MAP.map((item) => {
          const { label, value, tooltip } = item;
          return (
            <Col
              span={8}
              key={value}
              className={classnames(styles['data-set-add-modal-item'], 'c-po')}
              onClick={handleSelect.bind(null, value)}
            >
              <div>
                <div>{label}</div>
                <div>{tooltip}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </ButtonModal>
  );
};

export default AddModal;
