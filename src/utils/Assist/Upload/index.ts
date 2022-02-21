import { Upload } from 'chunk-file-upload';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import {
  checkUploadFile,
  uploadFile,
  DEFAULT_CHECK_UPLOAD_PARAMS,
} from '@/services';

const UPLOAD_INSTANCE = new Upload();

function exitDataFn(onResponse: Function) {
  return async function (params: {
    filename: string;
    md5: string;
    suffix: string;
    size: number;
    chunkSize: number;
    chunksLength: number;
  }) {
    const { size, suffix, md5, chunkSize } = params;
    const data = await checkUploadFile({
      auth: 'PUBLIC',
      mime: suffix,
      chunk: chunkSize,
      md5,
      size,
      name: md5,
    });
    onResponse(data);
    return data;
  };
}

function uploadFn() {
  return async function (data: any) {
    let response: any = {};
    const md5 = data.get('md5');
    const file = data.get('file');
    const index = data.get('index') as any;
    response = await uploadFile({
      md5: md5 as string,
      file: file as Blob,
      offset: (index as number) * DEFAULT_CHECK_UPLOAD_PARAMS.chunk,
    });
    return response;
  };
}

function beforeDelete(name: Symbol, fileList: any) {
  return function () {
    const target = fileList.find((item: any) => item.task.symbol === name);
    if (name) {
      UPLOAD_INSTANCE.cancel(name);
    }
    if (target && target.url) {
      URL.revokeObjectURL(target.url);
    }
    return true;
  };
}

// change
// percent progress
export function UploadImage(
  value: UploadFile,
  {
    onChange,
  }: {
    onChange?: (value: UploadFile) => void;
  },
) {
  const { originFileObj } = value;

  const [name] = UPLOAD_INSTANCE.add({
    file: {
      file: originFileObj as File,
    },
    request: {
      exitDataFn: exitDataFn(function (data: any) {
        value.response.id = data._id;
      }),
      uploadFn: uploadFn(),
      callback(err) {
        if (err) {
          value.status = 'error';
        } else {
          value.status = 'error';
        }

        console.log(value, 2222);
        onChange?.(value);
      },
    },
  });

  if (!name) {
    value.status = 'error';
  } else {
    UPLOAD_INSTANCE.deal(name);
    const task = UPLOAD_INSTANCE.getTask(name);
    value.response.task = task;
  }
}

export const createBaseUploadFile: (file: RcFile) => UploadFile = (file) => {
  return {
    uid: file.uid,
    size: file.size,
    name: file.name,
    fileName: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    status: 'uploading',
    percent: 0,
    // thumbUrl?: string;
    originFileObj: file,
  };
};
