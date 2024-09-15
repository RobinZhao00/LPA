import { Input, Button, Select, InputNumber, Form } from 'antd';
import { useState } from 'react';
import Layout from '../components/Layout';
import { CITY_DATA, URLS } from '../constants';
import { requestQueue } from '../utils';

function Home() {
  const [searchFields, setSearchFields] = useState({
    city: 101020100,
    query: '前端开发工程师',
    pageCount: 2,
    gap: 3,
    retryCount: 3,
  });
  const cityOptions = CITY_DATA.hotCitySites.map((city) => ({
    value: city.code,
    label: city.name,
  }));

  function getCrawlerUrlWithfileds(fields: any = {}): string[] {
    // 重新定义为箭头函数并添加默认值
    const { pageCount = 100 } = fields;
    return Array.from({ length: pageCount }).map((_, page) => {
      let link = URLS.job;
      Object.entries({ ...fields, page: page + 1 }).forEach(([key, value]) => {
        link = link.replace(`{${key}}`, value);
      });
      return link;
    });
  }

  function fomatListData(res: any[]): any[] {
    return res.reduce((prev, current) => {
      const { status, value = [] } = current;
      return status === 'fulfilled' ? [...prev, ...value] : prev;
    }, []);
  }

  async function fetchPages(fields: any = {}) {
    const urls = getCrawlerUrlWithfileds(fields);
    const res = await requestQueue(
      urls.map((url) => () => window?.electron?.fetchPage(url)), // Wrap in a function
      fields.gap,
      fields.retryCount,
      (progress: any) => {
        console.log(
          `当前第 ${progress.currentIndex}/${progress.total} 个请求，成功 ${progress.successCount} 个，失败 ${progress.failureCount} 个，重试中的 ${progress.retryingCount} 个`,
        );
      },
    );
    console.log('urls', JSON.stringify(fomatListData(res)));
  }
  const handleChange = async (type: string, value: any) => {
    setSearchFields({ ...searchFields, [type]: value });
  };

  const handleRunning = () => {
    fetchPages(searchFields);
  };

  return (
    <Layout className="home-container">
      <Form layout="inline">
        <Form.Item label="城市">
          <Select
            value={searchFields.city}
            style={{ width: 120 }}
            onChange={(value) => handleChange('city', value)}
            options={cityOptions}
          />
        </Form.Item>
        <Form.Item label="岗位">
          <Input
            placeholder="请输入岗位名称"
            value={searchFields.query} // 确保这里绑定了默认值
            onChange={(e) => handleChange('query', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="页数">
          <InputNumber
            min={1}
            max={100}
            value={searchFields.pageCount} // 确保这里绑定了默认值
            onChange={(value) => handleChange('pageCount', value)}
          />
        </Form.Item>
        <Form.Item label="间隔时间">
          <InputNumber
            min={1}
            max={10}
            value={searchFields.gap} // 确保这里绑定了默认值
            onChange={(value) => handleChange('gap', value)}
          />
        </Form.Item>
        <Form.Item label="重试次数">
          <InputNumber
            min={1}
            max={10}
            value={searchFields.retryCount} // 确保这里绑定了默认值
            onChange={(value) => handleChange('retryCount', value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleRunning}>
            Running
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Home;
