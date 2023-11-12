
const { Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    'MetroMap',
    'root',
    '12345',
     {
       host: '127.0.0.1',
       dialect: 'mysql',
       pool :{
        max:10,
        mun:0,
        acquire : 60000,
        idle:10000,
       }
    }
   );
     try{
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
    
        }
            catch(error){
            console.error('Unable to connect to the database: ', error);
            resolve(false);
        }

        module.exports = sequelize;
