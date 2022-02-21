import React, { useCallback, useMemo, useState } from 'react';
import { Upload, Modal, UploadProps } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import type { UploadFile, UploadChangeParam } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { UploadImage, createBaseUploadFile } from '@/utils/Assist/Upload';
import styles from './index.less';

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const PicturesWall = (
  props: Partial<Exclude<UploadProps, 'fileList' | 'onChange'>> & {
    value?: UploadFile[];
    onChange?: (value: UploadFile[]) => void;
  },
) => {
  const [value = [], setValue] = useControllableValue<UploadFile[]>(props, {
    defaultValuePropName: 'defaultFileList',
  });

  const { value: propsValue, onChange, className, ...nextProps } = props;

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleCancel = useCallback(() => setPreviewVisible(false), []);

  const handlePreview = useCallback(async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  }, []);

  // 自定义上传文件
  const beforeUpload = useCallback(
    async (file) => {
      const baseUploadFile = createBaseUploadFile(file);
      setValue([baseUploadFile]);
      UploadImage(baseUploadFile, {
        onChange: (value) => {
          setValue([value]);
        },
      });

      return false;
    },
    [UploadImage],
  );

  const uploadButton = useMemo(() => {
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
  }, []);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={value.map((item) => ({
          ...item,
          name: 'background',
          status: 'done',
          uid: '1',
        }))}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        accept="image/*"
        className={classnames(styles['component-image-upload'], className)}
        {...nextProps}
      >
        {value.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="background" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
