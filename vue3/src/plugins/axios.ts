import axios from 'axios';
import axiosBaseUrl from '@/config/index';

const Axios = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

Axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  }
);

const calcPrefix = (api: string) => {
  const boo: boolean = JSON.parse(process.env.VUE_APP_IS_MOCK);
  return boo ? `/api${api}` : api;
};

const $http = {
  get(api: string, params?: object, opts?: object) {
    return new Promise((resolve, reject) => {
      Axios.get(axiosBaseUrl.url + calcPrefix(api), {
        params,
        ...opts
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(api: string, params?: object, opts?: object) {
    return new Promise((resolve, reject) => {
      Axios.post(axiosBaseUrl.url + calcPrefix(api), params, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(api: string, params?: object, opts?: object) {
    return new Promise((resolve, reject) => {
      Axios.put(axiosBaseUrl.url + calcPrefix(api), params, opts)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(api: string, params?: object, opts?: object) {
    return new Promise((resolve, reject) => {
      Axios.delete(axiosBaseUrl.url + calcPrefix(api), {
        params,
        ...opts
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default $http;
