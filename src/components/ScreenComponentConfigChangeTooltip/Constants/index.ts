import versionTooltip1P21 from './1.21';

export default [
  {
    version: '1.21',
    tooltip: versionTooltip1P21,
  },
] as {
  version: string;
  tooltip: {
    [configId: string]: string;
  };
}[];
