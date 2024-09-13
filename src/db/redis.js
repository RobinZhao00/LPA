const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379, // Redis 默认端口
  password: '520Fangfang', // 如果设置了密码
  // username: 'default'
  // url: 'redis://default:520Fangfang@127.0.0.1:6379/0'
});

client.on('error', (err) => {
  console.error('Redis 客户端错误:', err);
});

client.on('connect', () => {
  console.log('Connected to Redis server.');
});

(async () => {
  try {
    await client.connect();
    const name = await client.get('name');
    await client.set('nikname', 'zhangsan');
    console.log('name', name);
    // 关闭客户端
    await client.quit();
  } catch (err) {
    console.error('Error:', err);
  }
})();
