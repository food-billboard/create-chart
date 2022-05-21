import { Upload } from 'chunk-file-upload';
import { nanoid } from 'nanoid';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import {
  checkUploadFile,
  uploadFile,
  DEFAULT_CHECK_UPLOAD_PARAMS,
  getUploadFile,
} from '@/services';

const UPLOAD_INSTANCE = new Upload();

export function exitDataFn(onResponse: Function) {
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

export function uploadFn() {
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

export function beforeDelete(target: UploadFile) {
  try {
    UPLOAD_INSTANCE.cancel(target.response.task.name);
    URL.revokeObjectURL(target.preview || '');
  } catch (err) {}
  return true;
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
  value.response = value.response || {};

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
          onChange?.(value);
        } else {
          getUploadFile({ _id: value.response.id })
            .then((data: any) => {
              const [target = {}] = data.list || [];
              value.url = target.src || '';
              value.status = 'done';
            })
            .catch((err) => {
              value.status = 'error';
            })
            .then((_) => {
              onChange?.(value);
            });
        }
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

export const createUploadedFile = (url: string) => {
  const name = url.substring(url.lastIndexOf('\\') + 1);
  return {
    uid: nanoid(),
    name,
    fileName: name,
    status: 'done',
    url,
  };
};
