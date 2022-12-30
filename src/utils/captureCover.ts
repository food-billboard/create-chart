import type { Options } from 'html2canvas';
import { UploadImage } from './Assist/Upload';

export async function captureCover(
  query: string,
  html2canvasOptions: Partial<Options> = {},
) {
  const element: HTMLElement | null = document.querySelector(query);

  if (!element) return Promise.reject();

  //* 暂时不要
  /*  
  const originWidth = element.offsetWidth 
  const originHeight = element.offsetHeight 
  */
  const { width, height } = element.getBoundingClientRect() || {};

  const options: Partial<Options> = {
    useCORS: true, //允许跨域图片
    allowTaint: true, //允许跨域图片
    logging: true,
    width,
    height,
    scrollY: 0,
    scrollX: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // * 暂时不要
    // onclone: (document) => {
    //   const deleteStyleKeys = ['transform', 'transition', 'boxShadow']
    //   const element = document.querySelector(query)
    //   if(!element) return
    //   deleteStyleKeys.forEach((key) => {
    //     (element as any).style[key] = ''
    //   })
    // },
    ...html2canvasOptions,
  };

  return import(/* webpackChunkName: "HTML2CANVAS" */ 'html2canvas').then(
    (module) => {
      const html2canvas = module.default;
      new Promise<Blob>((resolve, reject) => {
        html2canvas(element as any, options).then(function (context) {
          context.toBlob(
            (data) => {
              if (data) {
                resolve(data);
              } else {
                reject();
              }
            },
            'image/png',
            0.9,
          );
        });
      });
    },
  );
}

export async function captureCoverAndUpload(blob: Blob) {
  const file = new File([blob], `cover_${Date.now()}.png`, {
    type: 'image/png',
  });
  return new Promise((resolve, reject) => {
    UploadImage(
      {
        originFileObj: file,
      } as any,
      {
        onChange: (value) => {
          const { status, url } = value;
          if (status === 'done') {
            resolve(url);
          } else if (status === 'error') {
            reject('upload error');
          }
          setTimeout(() => {
            reject('timeout');
          }, 1 * 60 * 1000);
        },
      },
    );
  });
}
