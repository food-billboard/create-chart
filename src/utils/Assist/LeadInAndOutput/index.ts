import { Upload } from 'chunk-file-upload';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { get } from 'lodash';
import { message } from '@/components/Message';
import { postScreenLeadIn, postScreenExport } from '@/services';
import LocalConfigInstance, { LocalConfig } from '../LocalConfig';
import { updateCurrentScreenShot } from '../ScreenShotUtils';
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

  return Promise.all([
    LocalConfigInstance.getItem(LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY),
    LocalConfigInstance.getItem(LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY),
  ])
    .then((data) => {
      const index = data.findIndex((item) => item.errMsg);
      if (!!~index) return Promise.reject(data[index].errMsg);
      const [value, screenShot] = data;
      return {
        value: value.value,
        screenShot: screenShot.value?.[value.value._id] || {},
      };
    })
    .then((data) => {
      const blob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      let filename = get(data, 'value.name') || 'component';
      return saveAs(
        blob,
        `${filename}-screen-data-${dayjs().format('YYYY-MM-DD')}.json`,
      );
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
export async function staticLeadIn(config?: {
  onError?: () => void;
  onOk?: () => void;
  onStart?: () => void;
}) {
  const { onError, onOk, onStart } = config || {};
  if (LEAD_IN_LOADING) return;
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'application/json');
  input.addEventListener('change', (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      LEAD_IN_LOADING = true;
      onStart?.();
      message.info('导入中...');

      const fileReader = new FileReader();

      fileReader.onload = function (e) {
        const data = e.target?.result;
        if (data) {
          // * 1.22 前只有大屏的数据，之后会把快照的数据也一并导出，所以在导入这边需要分别保存
          const jsonData = JSON.parse(data as string);
          let action: any[] = [];
          // 新版本
          if (jsonData.screenShot) {
            action = [
              LocalConfigInstance.setItem(
                LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
                jsonData.value,
              ),
              updateCurrentScreenShot(
                jsonData.value._id,
                jsonData.screenShot[jsonData.value._id],
              ),
            ];
          } else {
            action = [
              LocalConfigInstance.setItem(
                LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
                jsonData,
              ),
            ];
          }

          Promise.all(action)
            .then(() => {
              onOk?.();
            })
            .catch((err) => {
              console.error(err);
              message.info('文件解析错误');
              onError?.();
              LEAD_IN_LOADING = false;
            });
        } else {
          message.info('文件解析错误');
          onError?.();
          LEAD_IN_LOADING = false;
        }
      };

      return fileReader.readAsText(file);
    }
  });
  input.click();
}
