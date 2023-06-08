import { message } from 'antd';
import { getDvaApp } from 'umi';
import {
  postScreen,
  putScreen,
  postScreenModel,
  putScreenModel,
  putScreenPool,
  putScreenModelPool,
} from '@/services';
import { isModelHash } from '@/hooks';
import { IGlobalModelState } from '@/models/connect';
import { captureCover, captureCoverAndUpload } from '@/utils/captureCover';
import LocalConfigInstance, { LocalConfig } from '../LocalConfig';
import nProgressUtil from '../Progress';
import { SCREEN_VERSION } from '../../constants';

// 正常保存大屏
export const saveScreenData = async ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  if (loading) return;
  setLoading(true);
  nProgressUtil.start();

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
    nProgressUtil.done();
  }
};

// 链式全量保存大屏
export const saveScreenDataAllAuto = async ({
  state,
  action,
}: {
  state: IGlobalModelState;
  action: {
    type: API_SCREEN.TEditScreenPoolParams['type'];
    action?: any;
  };
}) => {
  nProgressUtil.start();

  try {
    const isModel = isModelHash(location.hash);

    const { screenData, components, guideLine } = state;
    const {
      name,
      _id,
      description,
      poster,
      config: { flag },
    } = screenData || {};

    const params = {
      _id,
      name,
      description,
      poster,
      flag: flag.type,
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
    nProgressUtil.done();
  }
};

// 链式保存大屏
export const saveScreenDataAuto = async ({
  state,
  action,
}: {
  state: IGlobalModelState;
  action: {
    type: API_SCREEN.TEditScreenPoolParams['type'];
    action?: any;
  };
}) => {
  nProgressUtil.start();

  try {
    const isModel = isModelHash(location.hash);

    const { screenData } = state;
    const { _id } = screenData || {};

    // 不可能出现id不存在的情况
    if (!_id) {
      throw new Error('cant not find the component id');
    }

    const params = {
      _id,
      ...action,
    };
    let method: any;
    // 模板
    if (isModel) {
      method = putScreenModelPool;
    }
    // 大屏
    else {
      method = putScreenPool;
    }

    await method(params as any);
  } catch (err) {
    message.info('保存失败，请重试');
    console.error(err);
  } finally {
    nProgressUtil.done();
  }
};

// 链式全量纯前端保存大屏
export const saveScreenDataAllAutoStatic = async ({
  state,
  action,
}: {
  state: IGlobalModelState;
  action: {
    type: API_SCREEN.TEditScreenPoolParams['type'];
    action?: any;
  };
}) => {
  nProgressUtil.start();

  try {
    const { screenData, components, guideLine } = state;

    const params = {
      version: SCREEN_VERSION,
      ...screenData,
      config: {
        ...screenData.config,
        attr: {
          ...screenData.config.attr,
          guideLine,
        },
      },
      components,
    };
    await LocalConfigInstance.setItem(
      LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
      params,
    );
  } catch (err) {
    message.info('保存失败，请重试');
    console.error(err);
  } finally {
    nProgressUtil.done();
  }
};
