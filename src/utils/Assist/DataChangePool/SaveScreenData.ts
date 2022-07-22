import { message } from 'antd';
import NProgress from 'nprogress';
import { getDvaApp } from 'umi';
import {
  postScreen,
  putScreen,
  postScreenModel,
  putScreenModel,
} from '@/services';
import { isModelHash } from '@/hooks';
import { IGlobalModelState } from '@/models/connect';
import { captureCover, captureCoverAndUpload } from '@/utils/captureCover';

export const saveScreenData = async ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  if (loading) return;
  setLoading(true);
  NProgress.start();

  try {
    const isModel = isModelHash(location.hash);
    const app = getDvaApp();
    const store = app._store.getState().global;
    const dispatch = app._store.dispatch;
    const { screenData, components, guideLine } = store;
    const { name, _id, description, poster } = screenData || {};

    const setScreen = (value: any) =>
      dispatch({ type: 'global/setScreen', value });

    let coverPoster = poster;
    if (!coverPoster) {
      // 截图
      const coverBlob = await captureCover('#panel-id');
      coverPoster = (await captureCoverAndUpload(coverBlob)) as any;
      setScreen({
        poster: coverPoster,
      });
    }

    const params = {
      _id,
      name,
      description,
      poster: coverPoster,
      flag: 'PC',
      data: JSON.stringify({
        ...screenData,
        config: {
          ...screenData.config,
          attr: {
            ...screenData.config.attr,
            guideLine,
          },
        },
        poster: screenData.poster || coverPoster,
        components,
      }),
    };
    let method: any;
    // 模板
    if (isModel) {
      method = _id ? putScreenModel : postScreenModel;
    }
    // 大屏
    else {
      method = _id ? putScreen : postScreen;
    }

    const result = await method(params as any);
    setScreen?.({
      _id: result as string,
    });
  } catch (err) {
    message.info('保存失败，请重试');
    console.error(err);
  } finally {
    setLoading(false);
    NProgress.done();
  }
};

export const saveScreenDataAuto = async ({
  state,
}: {
  state: IGlobalModelState;
}) => {
  NProgress.start();

  try {
    const isModel = isModelHash(location.hash);

    const { screenData, components, guideLine } = state;
    const { name, _id, description, poster } = screenData || {};

    const params = {
      _id,
      name,
      description,
      poster,
      flag: 'PC',
      data: JSON.stringify({
        ...screenData,
        config: {
          ...screenData.config,
          attr: {
            ...screenData.config.attr,
            guideLine,
          },
        },
        poster,
        components,
      }),
    };
    let method: any;
    // 模板
    if (isModel) {
      method = _id ? putScreenModel : postScreenModel;
    }
    // 大屏
    else {
      method = _id ? putScreen : postScreen;
    }

    await method(params as any);
  } catch (err) {
    message.info('保存失败，请重试');
    console.error(err);
  } finally {
    NProgress.done();
  }
};
