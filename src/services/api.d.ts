declare namespace API_UPLOAD {
  export interface UploadParams {
    file: File;
  }

  export interface UploadRes {
    _id: string;
    url: string;
  }
}
