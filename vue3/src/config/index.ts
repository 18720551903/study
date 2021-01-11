interface AxiosBaseUrl {
  url: string;
}

const axiosBaseUrl: AxiosBaseUrl = {
  url: ''
};

axiosBaseUrl.url = process.env.VUE_APP_URL;

export default axiosBaseUrl;
