import { useState } from 'react';
import {
  getScreenShotList,
  addScreenShot,
  updateScreenShot,
  deleteScreenShot,
  useScreenShot,
} from '@/services';
import GlobalConfig from '@/utils/Assist/GlobalConfig';

// 区分improve 和 staitc
const useService = ({ screen }: { screen: string }) => {
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
      setDataSource([
        {
          _id: '1',
          createAt: '2023-01-01',
          user: '我是煞笔',
          description: '',
          isUse: false,
        },
        {
          _id: '2',
          createAt: '2023-02-01',
          user: '我是煞笔',
          description: '222'.repeat(200),
          isUse: true,
        },
      ]);
    }
  };

  // 新增
  const onAdd = async (callback: any = fetchData) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await addScreenShot({ _id: screen });
    } else if (GlobalConfig.IS_STATIC) {
      // TODO
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
      // TODO
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
      // TODO
    }
    callback();
  };

  // 使用
  const onUse = async ({ _id }: { _id: string }, callback: any = fetchData) => {
    if (GlobalConfig.IS_IMPROVE_BACKEND) {
      await useScreenShot({ screen, _id });
    } else if (GlobalConfig.IS_STATIC) {
      // TODO
    }
    callback();
  };

  return {
    fetchData,
    onAdd,
    onUpdate,
    onDelete,
    onUse,
    dataSource,
  };
};

export default useService;
