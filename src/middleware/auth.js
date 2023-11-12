const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const model = require('../models/model');
module.exports = {

    generateToken : async (userId) => {
        const newtoken = jwt.sign({user_id :userId.toString()},process.env.JWT_SECRET_KEY,{ expiresIn : '50m'});
       return newtoken;
       },
   

    adminAuth : async(req,res,next) =>{

        try {

           const checkToken = await model.findToken(req.header('Authorization'));
             

         if(!checkToken) {

           const token = req.header('Authorization').replace("Bearer ", "");
         
           if (!token) {
             return  res.status(401).json({message : 'Missing authorization header'});
           }
             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
              if (err) {
               return false;
              }
              return decoded
            }) 
              if(!decoded){
               return res.status(401).json({message :'session expired'});
             }
   
           const user = await userSchema.findOne({where: 
             {user_id : decoded.user_id,
              role : 'admin'}});
           if(!user){
            return res.status(401).json({message: "access denied"});
           } 
             req.user = user;
             req.token = token;
          }    
          else{
            return res.status(401).json({message : "kindly login"})
         } 
        } 
            catch(error){  
                return  res.status(500).json({message: "server error"});
               }
              next();
        },
  


        userAuth : async (req,res,next)=>{

          try {
              
             const checkToken = await model.findToken(req.header('Authorization'));
             

             if(!checkToken) {
            
             const token = req.header('Authorization').replace("Bearer ", "");
             const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
         
             if (!token) {
               return res.status(401).json({message :'Missing authorization header'});
             }
               const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {
                if (err) {
                 return false;
                }
                return decoded;
              }) 
                if(!decoded){
                 return res.status(401).json({message :'session expired'});
               }
         
            const user = await userSchema.findOne({where: {
               user_id : decode.user_id}});
              
             if(!user){
              return  res.status(401).json({message : 'please authenticate'})
             } 
               req.user = user;
               req.token = token;
            }    

            else{
              return res.status(401).json({message : "kindly login"})
           } 
          } 

              catch(error){  
                  return response.serverResponse(res,500,"Server Error");
                 }

                 next();
            }
              
    }