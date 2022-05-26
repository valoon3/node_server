'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const User = require('./user');
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

User.associate(db);


module.exports = db;
// sequelize는 시퀄라이즈 패키지이자 생성자
// config/config.json 에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체를 생성한다.
// 나중에 재사용하기 위해 db.sequelize에 넣어둔다.