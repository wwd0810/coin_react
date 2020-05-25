import { AxiosError } from "axios";

declare module "react-canvas-js";

declare global {
  type ApiResult<T> = {
    result: number;
    data: T;
  };

  type Pending = {
    [key: string]: boolean;
  };
  type Success = {
    [key: string]: boolean;
  };
  type Failure = { [key: string]: [boolean, null | AxiosError] };

  // ==================== paging ====================

  // ==================== window ====================
  interface Window {
    Fcm?: {
      postMessage: (str: "getToken") => void;
    };
    ReactNativeWebView?: {
      postMessage: (str: string) => void;
    };
    receiveToken: (str: string) => void;
  }
}
