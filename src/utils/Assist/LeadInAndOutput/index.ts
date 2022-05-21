import { message } from 'antd';
import { Upload } from 'chunk-file-upload';
import { postScreenLeadIn, postScreenExport } from '@/services';
import { exitDataFn, uploadFn } from '../Upload';
import { saveAs } from 'file-saver';

// 导入 loading
let LEAD_IN_LOADING = false;
// 导出 loading
let EXPORT_LOADING = false;

// 文件上传
export async function upload(file: File) {
  const UPLOAD_INSTANCE = new Upload();

  let fileId: string = '';

  return new Promise((resolve, reject) => {
    const [name] = UPLOAD_INSTANCE.add({
      file: {
        file,
      },
      request: {
        exitDataFn: exitDataFn(function (data: any) {
          fileId = data._id;
        }),
        uploadFn: uploadFn(),
        callback(err) {
          if (err) {
            reject(err);
          } else {
            resolve(fileId);
          }
        },
      },
    });

    if (!name) {
      return Promise.reject();
    } else {
      UPLOAD_INSTANCE.deal(name);
    }
  })
    .then(() => {
      UPLOAD_INSTANCE.dispose();
      return fileId;
    })
    .catch((err) => {
      UPLOAD_INSTANCE.dispose();
      return Promise.reject(err);
    });
}

// 导入
export async function LeadIn(type: API_SCREEN.TPreLeadInDataParams['type']) {
  if (LEAD_IN_LOADING) return;
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'application/json');
  input.addEventListener('change', (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      LEAD_IN_LOADING = true;
      message.info('导入中...');
      upload(file)
        .then((data) => {
          return postScreenLeadIn({
            type,
            _id: data,
          });
        })
        .then((_) => {
          message.info('文件导入成功');
        })
        .catch((err) => {
          message.info('文件导入失败');
        })
        .then((_) => {
          LEAD_IN_LOADING = false;
        });
    }
    console.log(e.target?.files);
  });
  input.click();
}

// 导出
export async function exportData(params: {
  _id: string;
  type: API_SCREEN.TPreLeadInDataParams['type'];
}) {
  if (EXPORT_LOADING) return;

  EXPORT_LOADING = true;

  return postScreenExport(params)
    .then((value: any) => {
      return saveAs(value);
    })
    .catch((err) => {
      message.info('导出文件失败');
    })
    .then((_) => {
      EXPORT_LOADING = false;
    });
}
