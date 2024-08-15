import { AxiosInstance } from 'axios';
import axiosConfigToCurl from './axiosConfigToUrl.ts';

let axiosInterceptorId: number | null = null;

function axiosCurling(
  axios: AxiosInstance,
  logger: (message: string) => any = console.log
) {
  axiosInterceptorId = axios.interceptors.response.use(
    (response) => {
      logger(axiosConfigToCurl(response.config));
      return response;
    },
    (error) => {
      logger(axiosConfigToCurl(error.config));
    }
  );
}

export function clearAxiosCurling(axios: AxiosInstance) {
  if (axiosInterceptorId === null) {
    console.warn('axiosCurling is not enabled');
    return;
  }
  axios.interceptors.response.eject(axiosInterceptorId);
}

export default axiosCurling;
