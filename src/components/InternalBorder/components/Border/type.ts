import { ReactNode, CSSProperties } from 'react';

export type CommonBorderProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  [key: string]: any;
};
