import { Button, InputNumber, Form } from 'antd';
import { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { requestQueue } from '../utils';
import data from '../../db/job.json';

function Contract() {
  const [searchFields, setSearchFields] = useState({
    gap: 2.5,
    retryCount: 3,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  function fomatListData(res: any[]): any[] {
    return res.reduce((prev, current) => {
      const { status, value = [] } = current;
      return status === 'fulfilled' ? [...prev, value] : prev;
    }, []);
  }

  async function fetchPages(fields: any = {}) {
    const urls = data.slice(0, 20).map((job) => job.key) || [];
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
    localStorage.setItem('detail', JSON.stringify(fomatListData(res)));
    console.log('urls', JSON.stringify(fomatListData(res)));
  }
  const handleChange = async (type: string, value: any) => {
    setSearchFields({ ...searchFields, [type]: value });
  };

  const handleRunning = () => {
    // iframeRef.current?.contentWindow?.location.reload();
    setTimeout(() => {
      fetchPages(searchFields);
    }, 2000);
  };

  return (
    <Layout className="home-container">
      <Form layout="inline">
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
      <iframe
        ref={iframeRef}
        src="https://www.zhipin.com"
        title="Job Listings" // Added title for accessibility
      />
    </Layout>
  );
}

export default Contract;
