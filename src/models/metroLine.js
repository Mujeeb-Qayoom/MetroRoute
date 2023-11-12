const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbConnection");

  const MetroLine = sequelize.define('MetroLine', {
    line_id: {
      type: DataTypes.INTEGER,
       allowNull : false
    },
    line_color: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    total_stations: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    first_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_station_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  module.exports =  MetroLine;
