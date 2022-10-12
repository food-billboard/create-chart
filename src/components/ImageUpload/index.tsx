import { useCallback, CSSProperties, useState, useRef, useEffect } from 'react';
import { Upload, Modal, UploadProps, message } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import type { UploadFile } from 'antd/es/upload/interface';
import { FileImageOutlined, LinkOutlined } from '@ant-design/icons';
import {
  UploadImage,
  createBaseUploadFile,
  createUploadedFile,
  beforeDelete,
} from '@/utils/Assist/Upload';
import Input, { InputRef } from './Input';
import styles from './index.less';

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const UploadButton = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <div
      style={props.style}
      className={classnames(
        styles['component-image-upload-placeholder'],
        props.className,
      )}
    >
      <FileImageOutlined />
      <div style={{ marginTop: 8 }}>点击这里进行更改</div>
    </div>
  );
};

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
  const [validLoading, setValidLoading] = useState<boolean>(false);

  const inputRef = useRef<InputRef>(null);

  const handleCancel = useCallback(() => setPreviewVisible(false), []);

  const setInputValue = useCallback((value: string = '') => {
    inputRef.current?.setValue(value);
  }, []);

  const handlePreview = useCallback(
    async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        setInputValue(file.preview);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    },
    [setInputValue],
  );

  const onRemove = useCallback(
    (file) => {
      setInputValue('');
      setValue([]);
      return beforeDelete(file);
    },
    [setInputValue],
  );

  // 自定义上传文件
  const beforeUpload = useCallback(
    async (file) => {
      const baseUploadFile = createBaseUploadFile(file);
      onRemove(value[0]);
      setValue([baseUploadFile]);
      UploadImage(baseUploadFile, {
        onChange: (value) => {
          setValue([value]);
          setInputValue(value.url);
        },
      });

      return false;
    },
    [UploadImage, setInputValue, onRemove, value],
  );

  const onUrlChange = useCallback(
    (e) => {
      const [target] = value;
      const newUrl = e.target.value;
      if (newUrl === target?.url) return;
      if (!newUrl) {
        setValue([]);
        return;
      }
      setValidLoading(true);
      const image = new Image();
      image.onload = () => {
        beforeDelete(target);
        let newTarget: any = target;
        if (target) {
          newTarget.url = newUrl;
          newTarget.uid = nanoid();
          newTarget.originFileObj = undefined;
          newTarget.status = 'done';
        } else {
          newTarget = createUploadedFile(newUrl);
        }
        setValidLoading(false);
        setValue([newTarget]);
      };
      image.onerror = () => {
        message.info('图片资源获取失败');
        setValidLoading(false);
      };
      image.src = newUrl;
    },
    [value, onRemove],
  );

  useEffect(() => {
    const inputValue = inputRef.current?.getValue();
    const [target] = value;
    if (inputValue !== target?.url && target?.url) {
      inputRef.current?.setValue(target.url);
    }
  }, [value]);

  return (
    <>
      <Input
        defaultValue={value[0]?.preview || ''}
        onBlur={onUrlChange}
        className="w-100 m-b-4"
        ref={inputRef}
        prefix={<LinkOutlined />}
        placeholder="请输入图片地址"
      />
      <Upload
        listType="picture-card"
        fileList={value.map((item) => ({
          status: 'done',
          ...item,
        }))}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        accept="image/*"
        className={classnames(styles['component-image-upload'], className)}
        onRemove={onRemove}
        disabled={validLoading}
        {...nextProps}
      >
        {value.length >= 1 ? null : <UploadButton />}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handleCancel}
        width={'90vw'}
      >
        <img alt="background" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
