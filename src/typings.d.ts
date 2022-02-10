declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

declare let ga: Function;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
  | 'site'
  | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

type OptionalDeep<O> = {
  [K in keyof O]?: OptionalDeep<O[K]>;
};

type OptionalPart<O extends object, depth extends Depth> = {
  flat: OptionalFlat<O>;
  deep: OptionalDeep<O>;
}[depth];

type Depth = 'flat' | 'deep';

type InternalPartial<
  O extends object,
  depth extends Depth = 'flat',
> = OptionalPart<O, depth>;

declare type SuperPartial<T extends object> = InternalPartial<T, 'deep'>;

// declare type SuperPartial<T> = {
//   [P in keyof T]?: T[P] extends object ? SuperPartial<T[P]> : T[P];
// };
