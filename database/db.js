require('dotenv').config();

let dbinfo = process.env
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbinfo.DB_NAME, dbinfo.DB_USER, dbinfo.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mariadb'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established to MariaDB');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("migration reuissit")
  }).catch((err) => { console.log("Ohhhh " + err) })
  ;


module.exports = db;