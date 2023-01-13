import { message } from 'antd';
import { Upload } from 'chunk-file-upload';
import { saveAs } from 'file-saver';
import { postScreenLeadIn, postScreenExport } from '@/services';
import LocalConfigInstance, { LocalConfig } from '../LocalConfig';
import { exitDataFn, uploadFn } from '../Upload';

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
export async function LeadIn(
  type: API_SCREEN.TPreLeadInDataParams['type'],
  callback?: () => void,
) {
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
          callback?.();
        });
    }
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
      const { headers } = value;
      const disposition = headers['content-disposition'] || '';
      const filename = disposition.replace(/.+filename=/, '');
      return saveAs(
        new Blob([value.data], { type: 'application/json' }),
        decodeURIComponent(filename),
      );
    })
    .catch((err) => {
      message.info('导出文件失败');
    })
    .then((_) => {
      EXPORT_LOADING = false;
    });
}

// 静态导出
export async function staticExportData() {
  if (EXPORT_LOADING) return;

  EXPORT_LOADING = true;

  return LocalConfigInstance.getItem(
    LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY_KEY,
  )
    .then((data) => {
      const { value, errMsg } = data;
      if (errMsg) return Promise.reject(errMsg);
      const blob = new Blob([JSON.stringify(value!)], {
        type: 'application/json',
      });
      return saveAs(blob, 'component.json');
    })
    .catch((err) => {
      console.error(err);
      message.info('导出文件失败');
    })
    .then((_) => {
      EXPORT_LOADING = false;
    });
}

// 静态导入
export async function staticLeadIn(callback?: () => void) {
  if (LEAD_IN_LOADING) return;
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'application/json');
  input.addEventListener('change', (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      LEAD_IN_LOADING = true;
      message.info('导入中...');

      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const data = e.target?.result;
        if (data) {
          LocalConfigInstance.setItem(
            LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY_KEY,
            JSON.parse(data as string),
          )
            .then(() => {
              message.info('导入成功，即将刷新页面', 1, window.location.reload);
            })
            .catch((err) => {
              console.error(err);
              message.info('导入出错');
              callback?.();
              LEAD_IN_LOADING = false;
            });
        } else {
          callback?.();
          LEAD_IN_LOADING = false;
        }
      };

      return fileReader.readAsText(file);
    }
  });
  input.click();
}
