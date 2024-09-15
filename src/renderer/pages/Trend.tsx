import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import Layout from '../components/Layout';
import data from '../../db/job.json';

function Trend() {
  const [option, setOption] = useState({});

  useEffect(() => {
    console.log(JSON.stringify(data.map((job) => job.jobDesc.salaryDesc)));
    // 处理薪资数据
    const salaryData = data.slice(0, 10).map((job) => ({
      name: job.jobDesc.jobName,
      maxSalary: parseInt(
        job.jobDesc.salaryDesc.split('-')[1].replace('K', ''),
        10,
      ),
    }));

    const names = salaryData.map((item) => item.name);
    const maxSalaries = salaryData.map((item) => item.maxSalary);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['最大薪资'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: names,
      },
      series: [
        {
          name: '最大薪资',
          type: 'bar',
          data: maxSalaries,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: '平均值' }],
          },
        },
      ],
    };

    setOption(option);
  }, []);
  return (
    <Layout className="contact-container">
      <ReactECharts
        option={option}
        style={{ height: 400, width: '100%' }} // 设置图表大小
        className="react_for_echarts"
      />
    </Layout>
  );
}
export default Trend;
