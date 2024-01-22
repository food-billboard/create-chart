import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import { uniqueId } from 'lodash';
import { Component } from 'react';
import GhostButton from '@/components/GhostButton';
import { message } from '@/components/Message';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { UploadImage, createBaseUploadFile } from '@/utils/Assist/Upload';
import Input from '../Input';

class LocalUpload extends Component<{
  value: string;
  onChange?: (value: string) => void;
}> {
  id = uniqueId('local-upload');

  get realValue() {
    const { value } = this.props;
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

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

  handleChange = async ({ fileList }: any) => {
    if (fileList.length) {
      const [target] = fileList;
      try {
        const baseUploadFile = createBaseUploadFile(target);
        if (GlobalConfig.IS_IMPROVE_BACKEND) {
          // TODO
        } else if (GlobalConfig.IS_STATIC) {
          message.info('静态版本暂不支持文件上传');
        } else {
          UploadImage(baseUploadFile, {
            onChange: (value) => {
              this.props.onChange?.(value.url || '');
            },
          });
        }
      } catch (err) {
        message.info('图片解析失败');
        this.props.onChange?.('');
      }
    } else {
      this.props.onChange?.('');
    }
  };

  handleDelete = () => {
    this.props.onChange?.('');
  };

  render() {
    return (
      <>
        <div className="dis-flex m-b-4">
          <Input
            className="f-1"
            allowClear
            value={this.props.value.slice(0, 1000)}
            onChange={this.props.onChange}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={this.handleDelete}
            disabled={!this.realValue}
          />
        </div>
        <Upload
          fileList={[]}
          onChange={this.handleChange}
          beforeUpload={() => false}
          accept="application/json"
        >
          {this.fileList.length >= 1 ? null : (
            <GhostButton block icon={<UploadOutlined />}>
              选择文件
            </GhostButton>
          )}
        </Upload>
      </>
    );
  }
}

export default LocalUpload;
