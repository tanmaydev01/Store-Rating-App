const {DataTypes} = require("sequelize");

const sequelize = require("../config/database");

const Store = sequelize.define("Store",{

    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
     email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        isEmail:true
    }
  },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ownerId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }


})




module.exports = Store;