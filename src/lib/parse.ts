import { AxiosError } from "axios";

export default (e: AxiosError | null) => {
  if (e !== null) {
    const res = (e as AxiosError).response;
    if (res !== undefined && res !== null) {
      const code = res["data"]["code"];
      if (code !== undefined && code !== null) {
        return code;
        //   return ApiErrorCode[
        //     !Object.getOwnPropertyNames(ApiErrorCode).includes(code)
        //       ? "api.error.unknown"
        //       : code
        //   ];
      }
    }
  }

  return "api.error.unknown";
};
