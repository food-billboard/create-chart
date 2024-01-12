import { Upload } from 'antd';
import { uniqueId } from 'lodash';
import { Component } from 'react';
import Modal from '@/components/FocusModal';
import { getBase64, UploadButton } from '@/components/ImageUpload';
import { message } from '@/components/Message';
import styles from './index.less';

export const MAX_FILE_SIZE = 1021 * 5;

class LocalUpload extends Component<{
  value: string;
  onChange?: (value: string) => void;
}> {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  };

  id = uniqueId('local-upload');

  get fileList() {
    const { value } = this.props;
    return typeof value === 'string' && !!value
      ? [
          {
            uid: this.id,
            name: this.id,
            preview: value,
            url: value,
          },
        ]
      : [];
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: '自定义图形',
    });
  };

  handleChange = async ({ fileList }: any) => {
    if (fileList.length) {
      const [target] = fileList;
      try {
        if (target.size > MAX_FILE_SIZE) {
          message.info('文件过大');
          this.props.onChange?.('');
        } else {
          const fileUrl = await getBase64(target.originFileObj);
          this.props.onChange?.(fileUrl as string);
        }
      } catch (err) {
        message.info('图片解析失败');
        this.props.onChange?.('');
      }
    } else {
      this.props.onChange?.('');
    }
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={this.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={() => false}
          accept="image/*"
        >
          {this.fileList.length >= 1 ? null : (
            <UploadButton className={styles['component-local-upload-button']} />
          )}
        </Upload>
        <Modal
          open={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="icon" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default LocalUpload;
