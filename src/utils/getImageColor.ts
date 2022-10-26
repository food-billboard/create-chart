import { message } from 'antd';
// @ts-ignore
import ColorThief from '../lib/color-thief';

const GENERATE_COLOR_COUNT = 6;

const getImageColor = async (file: any) => {
  try {
    const newBlobUrl = URL.createObjectURL(file);
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = newBlobUrl;
    });
    const colorThief = new ColorThief();
    const mainColor = await colorThief.getColor(image);
    const similarColors = await colorThief.getPalette(
      image,
      GENERATE_COLOR_COUNT,
    );
    // return [mainColor, ...similarColors];
    return [...similarColors];
  } catch (err) {
    console.error(err);
    message.info('获取颜色失败');
  }

  return [];
};

export default getImageColor;
