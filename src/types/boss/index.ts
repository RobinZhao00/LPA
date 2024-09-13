import { AxiosResponse } from 'axios';

interface ICompany {
  brandName?: string;
  brandLogo?: string;
  brandStageName?: string;
  brandIndustry?: string;
  brandScaleName?: string;
}

interface IHR {
  bossName?: string;
  bossTitle?: string;
  bossOnline?: boolean;
}

interface IJobDesc {
  encryptJobId?: string;
  jobName?: string;
  salaryDesc?: string;
  jobLabels?: Array<string>;
  jobValidStatus?: number;
  skills?: Array<string>;
  jobExperience?: string;
  jobDegree?: string;
  welfareList?: Array<string>;
}

interface IGeoInfo {
  cityName?: string;
  areaDistrict?: string;
  businessDistrict?: string;
  industry?: number;
}

type IJobListItem = ICompany & IHR & IJobDesc & IGeoInfo;

type IJobList = Array<IJobListItem>[];

interface IObj {
  [key: string]: any;
}

interface ICity {
  name?: string;
  code?: number;
  url?: string;
}

interface ISiteGroup {
  firstChar?: string;
  code?: number;
  cityList?: Array<ICity>;
}

interface ISiteListItem extends ICity {
  subLevelModelList: Array<ICity & { subLevelModelList: Array<string> | null }>;
}

interface ISite {
  otherCitySites?: Array<ICity> | null;
  siteGroup?: Array<ISiteGroup> | null;
  hotCitySites?: Array<ICity> | null;
  siteList?: Array<ISiteListItem> | null;
}

interface IResponse<T = IObj> extends AxiosResponse {
  code?: number;
  message?: string;
  zpData?: T;
}

type IResponseForSite = IResponse<IObj | ISite>;
export {
  IJobListItem,
  IJobList,
  IResponse,
  IResponseForSite,
  ISite,
  IObj,
  IJobDesc,
  IGeoInfo,
  ICompany,
  IHR,
};
