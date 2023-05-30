import { versionCompare } from '@/utils';

export const ComponentTransformOriginChange = (version: string) => {
  return !version || versionCompare(version, '1.6')
    ? 'center center'
    : 'left top';
};
