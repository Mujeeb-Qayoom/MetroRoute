const userSchema = require("../models/user");
const metrolineSchema = require("../models/metroLine");
const stationSchema = require("../models/station");
const tokenSchema = require('../models/token');
const { Op } = require('sequelize');

module.exports = {

    find :async (email)=>{

        const result = await userSchema.findOne({where: { email :email}});
        if(result){
            return result;
        }
            return false;
     },

    signup : async(data) =>{
        const created = await userSchema.create(data);

        if(created){
            return true;
        }
            return false;
    },

    getLine : async(color)=>{

    
    const result = await metrolineSchema.findOne({where :{line_color:color}})
      if(result){
         return result;
      }
        return false;

    },

     getStation  : async(id) =>{

      const result = await stationSchema.findOne({where :{station_id : id}});
    
      if(result){
        return result;
      }
        return false;
    },


    addLine : async(data) =>{
        const result = await metrolineSchema.create(data);

        if(result) {
            return result;
        }
            return false;
    },

    addStation : async(data) =>{

        const result = await stationSchema.create(data);
        if(result) {
            return result;
        }
            return false;
    },

    getStations : async() =>{

      const result = await stationSchema.findAll();
    
      if(result){
        return result;
      }
        return false;
    },

    getMetrolines :  async() =>{

      const result = await metrolineSchema.findAll();
    
      if(result){
        return result;
      }
        return false;
    },


    getTheRoute : async(path) =>{

        const route =  await stationSchema.findAll({
            where: {
              station_id: {
                [Op.in]: path,
              },
            },
          });

          return route;
    },


getstatonIds : async(source,destination) =>{

   const stations =  await stationSchema.findAll({
        where: {
          station_name: [source, destination],
        },
        attributes: ['station_id', 'station_name'],
      });


    // Create a map of stations for easy access
    const stationMap = new Map(stations.map(station => [station.station_name, station]));

    // Sort the stations in the order of source and destination
    const sortedStations = [stationMap.get(source), stationMap.get(destination)].filter(Boolean);

    // Extract station IDs and station names
    const stationIds = sortedStations.map(station => ({
      station_name: station.station_name,
      station_id: station.station_id,
    }));

     return stationIds;
   } ,

   blacklistToken : async(token) =>{

    const result = await tokenSchema.create({token})

    if(result){
      return true;
    }
     return false;

   },

   findToken : async(token) => {

    const result = await tokenSchema.findOne({
      where: {
        token: token,
      },
    })

    if(result){
      console.log(result);
      return true;
    }
    return false;
  },

  getUser : async() =>{

    const result = await userSchema.findAll();
    
    if(result){
      return result
    }
      return false;
  },

  deleteUser :async(id) =>{

    const result = await userSchema.findByPk(id)

    if(result){

    return  await result.destroy();
    }
    return false;
  },

  deleteStation :async(id) =>{

    const result = await stationSchema.findByPk(id)

    if(result){

    return  await result.destroy();
    }
    return false;
  },

  deleteMetroline :async(id) =>{

    const result = await metrolineSchema.findByPk(id)

    if(result){

    return  await result.destroy();
    }
    return false;
  },

  

  
}  