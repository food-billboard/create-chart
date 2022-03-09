import { Random } from 'mockjs';

export function getName(count = 5) {
  const realCounter = count > 30 ? 30 : count;
  return new Array(realCounter).fill(0).map(() => {
    return Random.cname();
  });
}

export function getDate(count = 10) {
  const realCounter = count > 100 ? 100 : count;
  let month: string | number = new Date().getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  return new Array(realCounter).fill(0).map((_, index) => {
    const dateIndex = index + 1;
    const date = dateIndex < 10 ? `0${dateIndex}` : dateIndex;
    return `${month}-${date}`;
  });
}

export function getNumberValue(count = 10, min = 0, max = 200) {
  return new Array(count).fill(0).map((_) => {
    return Random.natural(min, max);
  });
}

export function getSeries(count = 2) {
  return new Array(count).fill(0).map((_, index) => {
    return `系列${index + 1}`;
  });
}
