import LocalConfigInstance, { LocalConfig } from '../LocalConfig';

// static
// 删除当前大屏的数据
export async function removeCurrentScreenData() {
  const { value: screenData } = await LocalConfigInstance.getItem(
    LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
  );
  const { errMsg: screenErrMsg } = await LocalConfigInstance.removeItem(
    LocalConfig.STATIC_COMPONENT_DATA_SAVE_KEY,
  );
  const { value: screenShotData } = await LocalConfigInstance.getItem(
    LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
  );
  delete screenShotData[screenData._id];
  const { errMsg: screenShotErrMsg } = await LocalConfigInstance.setItem(
    LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
    screenShotData,
  );
  if (screenErrMsg || screenShotErrMsg)
    throw new Error((screenErrMsg || screenShotErrMsg) as string);
}

// 删除或修改当前快照
export async function updateCurrentScreenShot(
  screenId: string,
  screenShotData?:
    | API_IMPROVE.LocalScreenShotDataValue[]
    | ((
        currentValue: API_IMPROVE.LocalScreenShotDataValue[],
      ) => API_IMPROVE.LocalScreenShotDataValue[]),
) {
  let nextValue: API_IMPROVE.LocalScreenShotData;
  const { value } = await LocalConfigInstance.getItem(
    LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
  );
  nextValue = value || {};
  if (screenShotData) {
    nextValue[screenId] =
      typeof screenShotData === 'function'
        ? screenShotData(nextValue[screenId])
        : screenShotData;
  } else {
    delete nextValue[screenId];
  }
  const { errMsg } = await LocalConfigInstance.setItem(
    LocalConfig.STATIC_SCREEN_SHOT_SAVE_KEY,
    nextValue,
  );
  if (errMsg) throw new Error(errMsg as string);
}
