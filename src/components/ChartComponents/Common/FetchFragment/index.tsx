import { useRef, forwardRef, useImperativeHandle } from 'react';
import { connect } from 'dva';
import { useUpdateEffect } from 'ahooks';
import { CompareFilterUtil } from '@/utils/Assist/FilterData';
import { mapStateToProps, mapDispatchToProps } from './connect';

export type TFetchFragmentProps = {
  params: ComponentData.TParams[];
  filter: ComponentData.TFilterConfig[];
  url: string;
  componentFilter: ComponentData.TComponentFilterConfig[];

  reFetchData: () => Promise<any>;
  reGetValue: () => void;
};

export type TFetchFragmentRef = {
  params: ComponentData.TParams[];
};

const FetchFragment = forwardRef<TFetchFragmentRef, TFetchFragmentProps>(
  (props, ref) => {
    const { params, filter, componentFilter, url, reFetchData, reGetValue } =
      props;
    const filterUtil = useRef<CompareFilterUtil>(
      new CompareFilterUtil(
        {
          url,
          componentFilter,
          onFetch: async () => {
            return reFetchData();
          },
          onFilter: async () => {
            return reGetValue();
          },
        },
        filter,
        params,
      ),
    );

    useUpdateEffect(() => {
      filterUtil.current?.compare(params);
    }, [params]);

    useImperativeHandle(
      ref,
      () => {
        return {
          params,
        };
      },
      [params],
    );

    return <></>;
  },
);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(FetchFragment);
