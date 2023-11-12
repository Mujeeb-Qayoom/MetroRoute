
const bcrypt = require('bcrypt');
const model = require("../models/model");
const {removeDuplicates} = require('../functions/removeDuplicates');
const {sortStations} = require('../functions/sortStations');
const auth = require('../middleware/auth');
const {calculateShortestPath} = require("../functions/dijkstraAlgo");
const {calculateOtherPaths} = require("../functions/dijkstraAlgo2");


module.exports = {

    signup : async(req,res) =>{
        const find = await model.find(req.body.email);
        
        if(find){
            return res.status(409).json({message : "email Already exists"});
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "password not matched" });
        }

        const hash = await bcrypt.hash(req.body.password,10);
        const data  = {
            username : req.body.username,
            email: req.body.email,
            password : hash,
            role : req.body.role
        }
        const result = await model.signup(data);

        if(result){
            return res.status(201).json({message : "user created sucessfully"});
        }

        else {
            return res.status(400).json({message : "failed to signup"})
        }
        
    },

    login : async (req,res) =>{

        const user = await model.find(req.body.email);
        if(!user){
             return res.status(404).json({mesaage : "user not found"});
        }
        const dcrypt = await bcrypt.compare(req.body.password,user.password);

        
        if(!dcrypt){
             return res.status(409).json({message : " check your credentials"});
        }
       
       const token = await auth.generateToken(user.user_id);
        return res.status(200).json({token});   
    },

    addMetroline : async (req,res) =>{

        const line = await model.getLine(req.body.line_color)
       
        if(line){  
            
            return res.json({
              message : "line already exists"
            })
        }
    else {

        const data = {
            line_id : req.body.line_id,
            line_color : req.body.line_color,
            total_stations : req.body.total_stations,
            first_station_id : req.body.first_station_id,
            last_station_id : req.body.last_station_id
        }

        const addLine = await model.addLine(data);
        console.log(addLine);

        if(addLine) {
            return res.status(201).json({message : "line added sucessfully"});
        }
           else{
            return res.status(400).json({message : "unable to add line"});
           }
        }
},

    addStation : async(req,res) =>{

         const data = {

            station_id : req.body.station_id,
            station_name : req.body.station_name,
            connected_stations : req.body.connected_stations,
            line_color : req.body.line_color,
            is_junction : req.body.is_junction
        }

         const station = await model.addStation(data);
           
           if(station) {
                return res.status(201).json({message : "station  added sucessfully"});
            }

           else{
                 return res.status(400).json({message : "unable to add station"});
           }
    },


 getRoute : async(req,res)=>{
       
  try {   

       // quering DB, names of stations and retreiving stations ids
        const stationIds = await model.getstatonIds(req.body.startPoint,req.body.endPoint)
      
      // getting all the stations from station table  
        const stations = await model.getStations();

      // the main alogorithm to find the shotrst path

       const shortestPath = await calculateShortestPath(stationIds[0].station_id,stationIds[1].station_id,stations);
       const otherPath = await calculateOtherPaths(stationIds[0].station_id,stationIds[1].station_id,stations);
    

     // get the data from the database

       const shortestRoute = await model.getTheRoute(shortestPath);
       const otherRoute = await model.getTheRoute(otherPath);

     // sort the paths according to the orginal path  
       const sortedStationData = await  sortStations(shortestRoute,shortestPath);
       const sortedOtherPath   = await  sortStations(otherRoute,otherPath);

      
    // removing redundent entries at junction points

        const route1 = removeDuplicates(sortedStationData,'station_name');
        const route2 = removeDuplicates(sortedOtherPath,'station_name');
       
    // calculating number of junctions
        const j1 = route1.filter(station => station.is_junction).length;
        const j2 = route2.filter(station => station.is_junction).length;



       if(route1.length <= route2.length)
          {
        if(stations){
            return res.status(200).json({shortestPathifff :shortestPath, 
                                         route :route1,
                                         NumberOfJunctions : j1,
                                         otherPath : otherPath, 
                                         otherRoute :route2,
                                         junctions : j2
                                         });
        }
          else{
            return res.status(404).json({ message : "unable to fetch" });
          }
        }
      else{

            if(stations){
                return res.status(200).json({shortestPathelse :otherPath, 
                                             route :route2,
                                             junctions : j2,
                                             otherPath : shortestPath, 
                                             otherRoute :route1,
                                             NumberOfJunctions : j1,
                                            });
            }
              else{
                return res.status(404).json({ message : "unable to fetch" });
              }

        }
     }

       catch(err){
         return res.status(404).json({ message : "something went wrong" });
      }

    },

    getAllUsers : async(req,res) =>{

      try {
        const users = await model.getUser();

         if(users){
          return res.status(200).json({users: users});
          }

         return res.status(404).json({message : "no user found" })
      }
      catch(error){
        res.status(500).json({message : "server error"});
      }
    },

    getStations : async(req,res) =>{

      try {
        const stations = await model.getStations();

         if(stations){
          return res.status(200).json({stations: stations});
          }

         return res.status(404).json({message : "no user found" })
      }
      catch(error){
        res.status(500).json({message : "server error"});
      }

    },


    getMetrolines : async(req,res) =>{

      try {
        const metrolines = await model.getMetrolines();

         if(metrolines){
          return res.status(200).json({metrolines: metrolines});
          }

         return res.status(404).json({message : "no user found" })
       }

       catch(error){

         res.status(500).json({message : "server error"});
      }

       

    },

    deleteUser :async(req,res) =>{

     try {
        const user = await model.deleteUser(req.body.user_id);

         if(user){
          return res.status(200).json({mesaage: "user deleted"});
          }

         return res.status(404).json({message : "user not found" })
      }
      catch(error){
        res.status(500).json({message : "server error"});
      }


    },


    deleteStation : async(req,res) =>{

      try {
        const station = await model.deleteStation(req.body.station_id);

         if(station){
          return res.status(200).json({mesaage: "station deleted"});
          }

         return res.status(404).json({message : "station not found" })
      }
      catch(error){
        res.status(500).json({message : "server error"});
      }
    },


   deleteMetroline : async(req,res) =>{

      try {
        const station = await model.deleteMetroline(req.body.line_color);

         if(station){
          return res.status(200).json({mesaage: "metroline deleted"});
          }

         return res.status(404).json({message : "metroline not found" })
      }
      catch(error){
        res.status(500).json({message : "server error"});
      }

     },


    updateStation : async(req,res) =>{


      const stationId = req.body.station_id;
      const { field, value } = req.body;
    
      try {
        // Check if the field is valid
        const validFields = ['station_name', 'connected_stations', 'is_junction', 'line_color'];
        if (!validFields.includes(field)) {
          return res.status(400).json({ message: 'Invalid field' });
        }
    
        // Find the station by ID
        const station = await model.getStation(stationId);
    
        if (!station) {
          return res.status(404).json({ message: 'Station not found' });
        }
        // Update the specified field
        station[field] = value;
        await station.save();
    
        return res.status(200).json({ message: `Station  updated successfully` });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
   },

   updateMetroline : async(req,res) =>{


    const lineColor = req.body.line_color;
    const { field, value } = req.body;
  
    try {
      // Check if the field is valid
      const validFields = [ 'total_stations', 'first_station_id', 'last_station_id','line_id'];
      if (!validFields.includes(field)) {
        return res.status(400).json({ message: 'Invalid field' });
      }
  
      // Find the station by ID
      const station = await model.getLine(lineColor);
  
      if (!station) {
        return res.status(404).json({ message: 'Station not found' });
      }
      // Update the specified field
      station[field] = value;
      await station.save();
  
      return res.status(200).json({ message: `Station  updated successfully` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
 },
    



  logout : async(req, res) => {
    try {
      // Add the user's token to the blacklist table in DB
     const result=  model.blacklistToken(req.header('Authorization'))
      
     if(result){
     return  res.json({ message: 'Logout successful' });
     }
     return res.json({message :"unable to logout"});
       
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  }