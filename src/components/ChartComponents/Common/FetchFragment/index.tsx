import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { connect } from 'dva';
import { useUpdateEffect } from 'ahooks';
import { CompareFilterUtil } from '@/utils/Assist/FilterData';
import { mapStateToProps, mapDispatchToProps } from './connect';

export type TFetchFragmentProps = {
  params: ComponentData.TParams[];
  filter: ComponentData.TFilterConfig[];
  constants: ComponentData.TConstants[];
  screenType: ComponentData.ScreenType;
  url: string;
  componentFilter: ComponentData.TComponentFilterConfig[];

  reFetchData: () => Promise<any>;
  reGetValue: () => void;
};

export type TFetchFragmentRef = {
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  filter: ComponentData.TFilterConfig[];
};

const FetchFragment = forwardRef<TFetchFragmentRef, TFetchFragmentProps>(
  (props, ref) => {
    const {
      params,
      filter,
      constants,
      componentFilter,
      url,
      reFetchData,
      reGetValue,
      screenType,
    } = props;

    // 检查数据过滤的方法
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

    // 数据发生改变的时候比较数据
    useUpdateEffect(() => {
      filterUtil.current?.compare(params);
    }, [params]);

    useImperativeHandle(
      ref,
      () => {
        return {
          params,
          constants,
          filter,
        };
      },
      [params, constants, filter],
    );

    useEffect(() => {
      reFetchData().then(reGetValue);
    }, []);

    return <></>;
  },
);

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(FetchFragment);
