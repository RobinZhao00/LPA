import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { agents, cookies, urls } from '../configs';
import { IResponse, ISite, IObj } from '../types/boss';
//
// const getCityData = async () => {
//   axios.create({
//     withCredentials: true,
//     headers: {
//       'User-Agent': 'your-default-user-agent',
//     },
//   });
// };

const getRandomElementOfArr = (arr: string[]): string => {
  const { floor, random } = Math;
  const { length } = arr;
  const randomNum = floor(random() * length);
  return arr[randomNum];
};

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'User-Agent': getRandomElementOfArr(agents),
    Referer: 'https://www.zhipin.com',
    cookie: getRandomElementOfArr(cookies),
    'Content-Type': 'application/json',
  },
});

const get = async (url: string, configs: AxiosRequestConfig): Promise<IObj> => {
  const response: IResponse = await axiosInstance({
    method: 'GET',
    url,
    ...configs,
  });
  const { code, zpData, message } = response.data;
  if (code !== 0) {
    console.error(message);
  }
  return code === 0 ? zpData : {};
};

const getSite = async (): Promise<ISite> => get(urls.site, {});

const geekFilterByLabel = async ({ labelId }: IObj): Promise<IObj> =>
  get(urls.geekFilterByLabel, { params: { labelId } });

geekFilterByLabel({ labelId: '0' }).then(console.log).catch();
// getSite().then(console.log).catch();
