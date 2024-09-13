const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('database_boss', 'root', '520Fangfang', {
  host: 'localhost',
  dialect: 'mysql', // 指定使用 MySQL
  dialectOptions: {
    multipleStatements: true, // 允许执行多条 SQL 语句
  },
  logging: false, // 在开发中，可以设置为 true 来记录查询
});

class User extends Model {
  beforeUpdate(options, transaction) {
    super.beforeUpdate(options, transaction);
    this.setDataValue('updated_at', DataTypes.NOW);
  }

  getterMethods = {
    // 当访问 myField 时，返回 my_field 的值
    userId() {
      return this.getDataValue('user_id');
    },
    userName() {
      return this.getDataValue('user_name');
    },
    userGender() {
      return this.getDataValue('user_gender');
    },
    userAge() {
      return this.getDataValue('user_age');
    },
    userAvatar() {
      return this.getDataValue('user_avatar');
    },
    updatedAt() {
      return this.getDataValue('updated_at');
    },
    createdAt() {
      return this.getDataValue('created_at');
    },
  };

  setterMethods = {
    // 当设置 myField 时，将值设置给 my_field
    userId(value) {
      return this.setDataValue('user_id', value);
    },
    userName(value) {
      return this.setDataValue('user_name', value);
    },
    userGender(value) {
      return this.setDataValue('user_gender', value);
    },
    userAge(value) {
      return this.setDataValue('user_age', value);
    },
    userAvatar(value) {
      return this.setDataValue('user_avatar', value);
    },
    updatedAt(value) {
      return this.setDataValue('updated_at', value);
    },
    createdAt(value) {
      return this.setDataValue('created_at', value);
    },
  };

  toJSON() {
    const values = { ...this.get({ plain: true }) };
    delete values.created_at; // 从序列化结果中删除 created_at
    delete values.updated_at; // 从序列化结果中删除 updated_at
    return values;
  }
}

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    User.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        userGender: {
          type: DataTypes.ENUM('MALE', 'FEMALE'),
          allowNull: false,
        },
        userAge: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        userAvatar: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        underscored: true, // 启用下划线命名约定
        sequelize,
        modelName: 'UserInfos',
      },
    );
    await User.sync();
    const users = await User.findAll({
      where: {
        userId: 3,
      },
    });
    const selectedUser = users[0];
    selectedUser.userName = '赵玉04';
    await selectedUser.save({ fields: ['userName'] });
    await selectedUser.reload();
    // console.log(User.findAll);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
