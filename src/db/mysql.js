const mysql = require('mysql2/promise');

const getData = async function () {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'database_boss',
    password: '520Fangfang',
  });

  try {
    const [results, fields] = await connection.query(
      'SELECT * FROM `user_infos`',
    );

    console.log(results); // results contains rows returned by server
    console.log(fields[0].name); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
};

getData();
