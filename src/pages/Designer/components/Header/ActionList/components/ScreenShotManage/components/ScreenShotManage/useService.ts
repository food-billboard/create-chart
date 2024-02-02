import dayjs from 'dayjs';
import { useState } from 'react';
import { message } from '@/components/Message';
import { useLocalStorage, useAnyDva } from '@/hooks';
import {
  getScreenShotList,
  addScreenShot,
  updateScreenShot,
  deleteScreenShot,
  useScreenShot,
} from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { LocalConfig } from '@/utils/Assist/LocalConfig';
import { MAX_SCREEN_SHOT_COUNT } from '@/utils/constants';

// 区分improve 和 static
const useService = ({ screen }: { screen: string }) => {
  const { getState } = useAnyDva();

  const [localDataSource = {}, setLocalDataSource, getLocalDataSource] =
    useLocalStorage<{
      [screenId: string]: (API_IMPROVE.GetScreenShotListData & {
        value: ComponentData.TScreenData;
      })[];
    }>(LocalConfig.CONFIG_KEY_BACKGROUND, {});

  const [dataSource, setDataSource] = useState<
    API_IMPROVE.GetScreenShotListData[]
  >([]);

  // 获取数据
  const fetchData = async () => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      const result = await getScreenShotList({ _id: screen });
      setDataSource(result as API_IMPROVE.GetScreenShotListData[]);
    } else if (GlobalConfig.IS_STATIC) {
      // TODO
    }
  };

  // 新增
  const onAdd = async (callback: any = fetchData) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await addScreenShot({ _id: screen });
    } else if (GlobalConfig.IS_STATIC) {
      try {
        const { screenData, components } = getState().global;
        const localDataSource = getLocalDataSource() || {};
        if (MAX_SCREEN_SHOT_COUNT <= localDataSource[screen]?.length) {
          return message.info('超过快照生成最大数量');
        }
        await setLocalDataSource({
          ...localDataSource,
          [screen]: [
            ...(localDataSource[screen] || []),
            {
              _id: Date.now().toString(),
              createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              user: '',
              description: '',
              isUse: false,
              value: {
                ...screenData,
                components,
              } as ComponentData.TScreenData,
            },
          ],
        });
      } catch (err) {
        console.error(err);
        message.info('快照生成失败');
      }
    }
    callback();
  };

  // 更新
  const onUpdate = async (
    { value, _id }: { value: string; _id: string },
    callback: any = fetchData,
  ) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await updateScreenShot({ screen, _id, description: value });
    } else if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).map((item) => {
            if (item._id === _id) {
              return {
                ...item,
                description: value,
              };
            }
            return item;
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    }
    callback();
  };

  // 删除
  const onDelete = async (
    { _id }: { _id: string },
    callback: any = fetchData,
  ) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await deleteScreenShot({ screen, _id });
    } else if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).filter((item) => {
            return item.isUse || item._id !== _id;
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    }
    callback();
  };

  // 使用
  const onUse = async ({ _id }: { _id: string }, callback: any = fetchData) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await useScreenShot({ screen, _id });
    } else if (GlobalConfig.IS_STATIC) {
      try {
        const localDataSource = getLocalDataSource() || {};
        await setLocalDataSource({
          ...localDataSource,
          [screen]: (localDataSource[screen] || []).map((item) => {
            return {
              ...item,
              isUse: item._id === _id,
            };
          }),
        });
      } catch (err) {
        console.error(err);
        message.info('操作失败');
      }
    }
    callback();
  };

  return {
    fetchData,
    onAdd,
    onUpdate,
    onDelete,
    onUse,
    dataSource: GlobalConfig.IS_STATIC
      ? localDataSource[screen] || []
      : dataSource,
  };
};

export default useService;
