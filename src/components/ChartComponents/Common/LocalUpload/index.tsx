import { Component } from 'react';
import { uniqueId } from 'lodash';
import { Button, Image, Upload, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '@/components/ImageUpload';
import styles from './index.less';

const MAX_FILE_SIZE = 1021 * 5;

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
    const uploadButton = (
      <div>
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    );
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
          {this.fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
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
