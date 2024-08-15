import { AxiosRequestConfig } from 'axios';

export function getMethod(config: AxiosRequestConfig) {
  return config.method || 'GET';
}

export function getUrl(config: AxiosRequestConfig) {
  const { url, baseURL } = config;

  if (!url) {
    return '';
  }

  if (!baseURL) {
    return url;
  }

  return `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export function getHeaders(config: AxiosRequestConfig) {
  const { headers } = config;

  if (!headers) {
    return '';
  }

  return Object.keys(headers)
    .filter((key) => headers[key] !== undefined)
    .map((key) => {
      return `-H "${key}: ${headers[key]}"`;
    })
    .join(' ');
}

export function getData(config: AxiosRequestConfig) {
  const { data } = config;

  if (!data) {
    return '';
  }

  if (typeof data === 'string') {
    return `-d '${data}'`;
  }

  return `-d '${JSON.stringify(data)}'`;
}

function axiosConfigToCurl(config: AxiosRequestConfig): string {
  return `curl -X ${getMethod(config)} ${getUrl(config)} ${getHeaders(
    config
  )} ${getData(config)}`;
}

export default axiosConfigToCurl;
