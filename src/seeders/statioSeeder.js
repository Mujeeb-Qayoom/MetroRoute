// seeders/dataSeeder.js
const sequelize = require('../config/database');
const Data = require('../models/dataModel');

const data = [
  {station_id : '1', station_name :  'A', connected_stations : '2',  line_color :'green'},
  {station_id : '2', station_name :'B', connected_stations :'1,3', line_color :'green'},
  {station_id : '3', station_name :'C',connected_stations : '2,4', line_color :'green',},
  {station_id : '4', station_name :'D', connected_stations :'3,5', line_color : 'green'},
  {station_id :'5', station_name :'E', connected_stations :'101,4', line_color :'green'},
  {station_id :'6',station_name :'F', connected_stations:'101,7',line_color :'green' },
  {station_id :'7', station_name :'G',connected_stations : '6,8',line_color :'green'},
  {station_id :'8', station_name :'H', connected_stations :'7,9',line_color :'green'},
  {station_id : '9', station_name :'I', connected_stations : '102,8', line_color : 'green'},
  {station_id : '10', station_name :'J', connected_stations :'102,11',line_color :'green'},
  {station_id :'11', station_name :'K', connected_stations :'10,12',line_color:'green'},
  {station_id :'12', station_name :'L', connected_stations:'11,103',line_color :'green'},
  {station_name :'13', station_name :'M',connected_stations :'103,14',line_color :'green'},
  {station_id :'14', station_name :'N', connected_stations :'13',line_color :'green'},
  {station_id : '50', station_name :'Z', connected_stations :'51',line_color : 'purple'},
  {station_id :'51', station_name : 'Y', connected_stations :'50,52',line_color :'purple'},
  {station_id :'52', station_name :'X', connected_stations :'51,53',line_color :'purple'},
  {station_id :'53', station_name :'W', connected_stations :'52,54', line_color :'purple'},
  {station_id : '54', station_name :'v', connected_stations :'101,53',line_color : 'purple'},
  {station_id :'55', station_name : 'U', connected_stations :'101,56',line_color :'purple'},
  {station_id : '56',station_name : 'T', connected_stations : '55,57',line_color :'purple'},
  {station_id :'57', station_name :'S', connected_stations :'56,58', line_color :'purple'},
  {station_id :'58', station_name :'R', connected_stations :'102,57',line_color :'purple'},
  {station_id :'59', station_name :'Q', connected_stations :'102,60',line_color :'purple'},
  {station_id :'60', station_name :'p', connected_stations :'103,61',line_color :'purple'},
  {station_id :'61', station_name :'O', connected_stations :'60',line_color :'purple'},
  {station_id :'101', station_name :'j1',connected_stations : '5,6,54,55', line_color :'purple'},
  {station_id :'102',station_name :'j2', connected_stations :'9,58,10,59',line_color :'purple'},
  {station_id :'103', station_name :'j3',connected_stations : '12,13,60,59',line_color :'purple'}

];

async function seedData() {
  try {
    await sequelize.sync({ force: true }); // This will drop and recreate the table, use with caution
    await Data.bulkCreate(data);
    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    sequelize.close();
  }
}

seedData();
