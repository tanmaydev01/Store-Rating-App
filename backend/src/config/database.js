const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "store-rating-app",
    "postgres",
    "root",
    {
        host:"localhost",
        dialect:"postgres",
        port:5432

    }
);

module.exports = sequelize;