import { useState, useEffect } from 'react';
import { Input, Button, Table, TableColumnProps } from 'antd';
import {
  IJobList,
  IJobListItem,
  IJobDesc,
  IGeoInfo,
  ICompany,
  IHR,
} from '@/types/boss';

const useCrawler = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 异步加载数据
    setIsLoading(false);
  }, []);

  function Crawler() {
    if (isLoading) return <div>Loading...</div>;
    const [data, setData] = useState<IJobList>([]);
    const [url, setUrl] = useState(
      'https://www.zhipin.com/web/geek/job?query=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88&city=101020100',
      // 'https://www.zhipin.com/job_detail/012762db81e669211HB_3t2-E1VX.html?lid=aQ9wngrOXku.search.1&securityId=CCKnV6iIjDSfn-Z1bw2ujtwaDVdTQCQkcgSgu1gZuXnPmsnjzqLKmY-ORayoso1qSYB1ex4up8yDCujcj5VDokZGOTDyLw9i_Tjx__wKPF0VwlRXzg~~&sessionId=',
    );
    const columns: TableColumnProps<IJobListItem>[] = [
      {
        title: '工作信息',
        dataIndex: 'jobDesc',
        render: (jobDesc?: IJobDesc) => <a>{jobDesc?.jobName}</a>,
      },
      {
        title: '地理位置',
        dataIndex: 'geoInfo',
        render: (geoInfo?: IGeoInfo) => <a>{geoInfo?.cityName}</a>,
      },
      {
        title: '公司信息',
        dataIndex: 'company',
        render: (company?: ICompany) => <a>{company?.brandName}</a>,
      },
      {
        title: 'hrx信息',
        dataIndex: 'hr',
        render: (hr?: IHR) => <a>{hr?.bossName}</a>,
      },
    ];
    const handleSearch = async () => {
      try {
        let hasCached = localStorage.getItem('dataSource');
        hasCached = hasCached ? JSON.parse(hasCached) : hasCached || [];
        if (hasCached.length) {
          setData(hasCached);
        } else {
          const result: IJobList = await window?.electron?.fetchPage(url);
          console.log('result', JSON.stringify(result));
          if (result) {
            setData(result);
            localStorage.setItem('dataSource', JSON.stringify(result));
          }
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    return (
      <>
        <Input onChange={(e) => setUrl(e.target.value)} value={url} />
        <Button onClick={handleSearch}>Search</Button>
        <Table columns={columns} rowKey="email" dataSource={data} />
      </>
    );
  }

  return { Crawler };
};

export default useCrawler;
