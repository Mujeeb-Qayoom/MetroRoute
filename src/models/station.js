const { DataTypes } = require('sequelize');
const metroLineSchema= require("../models/metroLine");
const sequelize = require('../config/dbConnection');

  const Station = sequelize.define('Station', {
    station_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    station_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    connected_stations: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_junction :{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }
  });

  Station.belongsTo(metroLineSchema,{foreignKey : 'line_color'})

  
  module.exports =  Station;

