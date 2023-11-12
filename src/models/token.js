const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbConnection");

const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.STRING, // This field can store the token string
      allowNull: false,
    },
  });

  module.exports =  Token;