declare namespace API_UPLOAD {
  export interface UploadParams {
    file: File;
  }

  export type TAuthType = 'PRIVATE' | 'PUBLIC';

  export interface ICheckUploadFileParams {
    'Tus-Resumable': '1.0.0';
    md5: string;
    auth: TAuthType;
    size: number;
    mime: string;
    name?: string;
    chunk: number;
  }

  export interface ICheckUploadFileRes {
    'Tus-Resumable': '1.0.0';
    location: string;
    'Upload-Offset': number;
    'Upload-Length': number;
    'Upload-Id': string;
  }

  export interface UploadRes {
    _id: string;
    url: string;
  }

  export interface IUploadParams {
    md5: string;
    offset: number;
    file: Blob;
  }

  export interface IGetUploadParams {
    _id: string;
    type?: 0 | 1 | 2;
  }
}

declare namespace API_SCREEN {
  export type TGetScreenListParams = {
    currPage?: number;
    pageSize?: number;
    content?: string;
  };

  export type TGetScreenListRes = {
    total: number;
    list: TGetScreenListData[];
  };

  export type TGetScreenListData = {
    _id: string;
    description: string;
    name: string;
    flag: 'PC' | 'H5';
    group: string;
    poster: string;
    enable: boolean;
  };

  export type TDeleteScreenParams = {
    _id: string;
  };

  export type TPreviewScreenParams = {
    _id: string;
  };

  export type TShareScreenParams = {
    _id: string;
    auth: 'PUBLIC' | 'PRIVATE';
    time?: number;
    password?: string;
  };

  export type TCloseShareScreenParams = {
    _id: string;
  };

  export type TEnableScreenParams = {
    _id: string;
  };

  export type TDisabledScreenParams = {
    _id: string;
  };

  export type TGetScreenDetail = {
    _id: string;
  };

  export type TAddScreenParams = {
    name: string;
    description?: string;
    poster: string;
    flag: 'PC' | 'H5';
    data: string;
  };

  export type TEditScreenParams = TAddScreenParams & {
    _id: string;
  };

  export type TEditScreenPoolParams = {
    _id: string;
    type: 'component' | 'undo' | 'redo' | 'guideLine' | 'callback' | 'screen';
    action?:
      | ComponentMethod.SetComponentMethodParamsData[]
      | ComponentMethod.SetComponentMethodParamsData
      | ComponentData.TGuideLineConfig
      | ComponentData.TFilterConfig[]
      | ComponentMethod.GlobalUpdateScreenDataParams;
  };

  export type TCreateScreenPoolParams = {
    _id: string;
    type: 'screen' | 'model';
  };

  export type TShareScreenGetParams = {
    _id: string;
  };

  export type TShareScreenGetData = {
    auth: 'PUBLIC' | 'PRIVATE';
    password: boolean;
    time: number;
  };

  export type TShareScreenHeartbeatParams = {
    _id: string;
  };

  export type TShareScreenPostParams = {
    _id: string;
    password: string;
  };

  export type TScreenDetail = {
    _id: string;
    name: string;
    description: string;
    poster: string;
    components: any;
    version: string;
  };

  export type TPreRequestDataParams = {
    url: string;
    body: string;
    header: string;
    method: 'get' | 'post';
  };

  export type TPreLeadInDataParams = {
    _id: string;
    type: 'screen' | 'model';
  };

  export type TPreExportDataParams = {
    _id: string;
    type: 'screen' | 'model';
  };
}

declare namespace API_MOCK {
  export type TGetMockKindListData = {
    id: string;
    value: string;
    description: string;
  };
}
