import html2canvas, { Options } from 'html2canvas';

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

  return new Promise<Blob>((resolve, reject) => {
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
}
