import { get } from 'lodash';
import { getDvaGlobalModelData } from '@/utils/Assist/Component';
import VariableStringUtil from '@/utils/Assist/VariableString';

// 发送给iframe的操作类型
enum ActionType {
  // 初始化 relationParams
  INIT_RELATION_PARAMS = 'INIT_RELATION_PARAMS',
  // relationParams 发生改变
  RELATION_PARAMS_CHANGE = 'RELATION_PARAMS_CHANGE',
  // 传递所有params
  POST_PARAMS = 'POST_PARAMS',
}
// 可以接收的iframe的响应类型
enum ResponseType {
  // 获取指定的 全局 params
  GET_PARAMS = 'GET_PARAMS',
  // relationParams 发生改变
  RELATION_PARAMS_CHANGE = 'RELATION_PARAMS_CHANGE',
}
type Value = {
  key: string;
  value: any;
};
// 发送数据格式
type PostMessageData = {
  id: string;
  value: Value[];
  actionType: ActionType;
};
// 接收的数据格式
type OnMessageData = {
  id: string;
  actionType: ResponseType;
  [key: string]: any;
};

class MessageUtil {
  constructor(iframeId: string, interactive: any) {
    this.iframeId = iframeId;
    this.interactive = interactive;
  }

  iframeId: string = '';
  iframeWindow!: Window;
  iframeUrl: string = '';
  interactive: any;

  eventBind() {
    window.addEventListener('message', this.onMessage);
  }

  eventUnBind() {
    window.removeEventListener('message', this.onMessage);
  }

  // 接收iframe传递的数据
  onMessage(e: any) {
    try {
      const { data, origin } = e;
      const objectValue: OnMessageData = JSON.parse(data);
      const { id, actionType, ...nextValues } = objectValue;
      if (
        id !== this.iframeId ||
        this.getDomain(this.iframeUrl) !== this.getDomain(origin) ||
        !ResponseType[actionType]
      )
        return;
      switch (actionType) {
        case ResponseType.GET_PARAMS:
          // iframe需要获取大屏的一些全局参数
          const { value } = nextValues;
          if (Array.isArray(value)) {
            const { params, constants } = this.getGlobalData();
            const allParams = VariableStringUtil.getAllGlobalParams4Array(
              params,
              constants,
            );
            this.postMessage({
              actionType: ActionType.POST_PARAMS,
              value: value
                .map((paramKey) => {
                  return allParams.find((item) => item.key === paramKey);
                })
                .filter(Boolean)
                .map((item) => ({ key: item.key, value: item.value })),
            });
          }
          break;
        // 默认就是把传过来的数据去同步一下大屏的参数
        case ResponseType.RELATION_PARAMS_CHANGE:
        default:
          this.interactive?.('message', nextValues);
      }
    } catch (err) {}
  }

  getDomain(url: string) {
    try {
      return new URL(url).origin;
    } catch (err) {
      return '';
    }
  }

  getGlobalData() {
    const data = getDvaGlobalModelData();
    return get(data, 'screenData.config.attr');
  }

  postMessage(message: Omit<PostMessageData, 'id'>) {
    if (!this.iframeWindow) return;
    this.iframeWindow.postMessage(
      JSON.stringify({
        ...message,
        id: this.iframeId,
      }),
      this.getDomain(this.iframeUrl),
    );
  }

  // 参数发生变化的时候通知iframe
  onParamsChange(params: ComponentData.TParams, newValue: any) {
    this.postMessage({
      value: [{ key: params.variable, value: newValue }],
      actionType: ActionType.RELATION_PARAMS_CHANGE,
    });
  }

  create(url: string, relationParams: string[]) {
    this.eventUnBind();
    this.iframeWindow = window.frames[this.iframeId as any];
    this.iframeUrl = url;
    this.eventBind();

    const { params, constants } = this.getGlobalData();
    const allParams = VariableStringUtil.getAllGlobalParams4Array(
      params,
      constants,
    );
    const sendData = relationParams
      .map((param) => {
        const target = allParams.find((item) => item.id === param);
        if (!target) return null;
        return {
          key: target.key,
          value: target.value,
        };
      })
      .filter(Boolean) as Value[];

    this.postMessage({
      value: sendData,
      actionType: ActionType.INIT_RELATION_PARAMS,
    });
  }

  destroy() {
    // @ts-ignore
    this.iframeWindow = null;
    this.eventUnBind();
  }
}

export default MessageUtil;
