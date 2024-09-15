type RequestFunction = () => Promise<any>;

interface SettledResult {
  status: 'fulfilled' | 'rejected';
  value?: any;
  reason?: any;
}

interface Progress {
  currentIndex: number;
  total: number;
  successCount: number;
  failureCount: number;
  retryingCount: number; // 新增的字段，追踪正在重试的请求数
}

function requestQueue(
  requests: RequestFunction[],
  interval: number,
  retryCount: number,
  onProgress?: (progress: Progress) => void,
): Promise<SettledResult[]> {
  const results: SettledResult[] = new Array(requests.length); // 存储所有请求的结果
  let successCount = 0;
  let failureCount = 0;
  let retryingCount = 0; // 用于追踪正在重试的请求数

  // 处理单个请求函数，带有重试机制
  const processRequest = async (
    request: RequestFunction,
    index: number,
    retriesLeft: number,
  ): Promise<void> => {
    try {
      // 发送请求
      const response = await request();
      // 成功请求，存入结果
      results[index] = {
        status: 'fulfilled',
        value: response,
      };
      successCount += 1; // 增加成功计数
    } catch (error) {
      if (retriesLeft > 0) {
        // 正在重试，请求计数加1
        retryingCount += 1;
        // 更新重试进度状态
        if (onProgress) {
          onProgress({
            currentIndex: index + 1,
            total: requests.length,
            successCount,
            failureCount,
            retryingCount,
          });
        }

        // 如果有重试次数剩余，递归调用自身
        await processRequest(request, index, retriesLeft - 1);
        retryingCount -= 1; // 重试结束，请求计数减1
      } else {
        // 重试完毕，记录失败
        results[index] = {
          status: 'rejected',
          reason: error,
        };
        failureCount -= 1; // 增加失败计数
      }
    }

    // 调用 onProgress 回调，更新实时状态
    if (onProgress) {
      onProgress({
        currentIndex: index + 1,
        total: requests.length,
        successCount,
        failureCount,
        retryingCount, // 传递当前重试中的请求数
      });
    }
  };

  // 使用 async/await 实现的队列处理
  return (async () => {
    for (let index = 0; index < requests.length; index += 1) {
      await processRequest(requests[index], index, retryCount); // 等待当前请求处理完成
      if (index < requests.length - 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, interval)); // 等待指定时间间隔
      }
    }
    return results;
  })();
}

export { requestQueue };
