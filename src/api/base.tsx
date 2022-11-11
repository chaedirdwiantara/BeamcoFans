import axios, {AxiosInstance} from 'axios';

type SsuAPIParams = {
  cookie?: string;
};

let API: AxiosInstance;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: 'https://rinjani-dev.ssudev.space/api/v1/fans-app',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  API.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        console.error(
          JSON.stringify({
            name: '[ssu-api][error]',
            detail: error.response?.data,
          }),
        );
      } else {
        console.error('[error]', error);
      }

      return Promise.reject(error);
    },
  );
};

export const initialize = (
  params?: SsuAPIParams,
  anonymous?: boolean,
): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || !API || anonymous) {
    setupAPIClient();
  }

  // TODO: add token on interceptor
  // const token = localStorage.getItem("token") as string | null;
  // if (token) {
  //   API.interceptors.request.use((config: AxiosRequestConfig) => {
  //     config.headers = {
  //       ...config.headers,
  //     };
  //     // config.headers["accesstoken"] = token;
  //     return config;
  //   });
  // }

  return API;
};

export default initialize;