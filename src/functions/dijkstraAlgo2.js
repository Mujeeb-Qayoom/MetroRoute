const PriorityQueue = require('priorityqueuejs'); 
async function calculateOtherPaths(startStationId, endStationId,stations) {


   // Create a map of station IDs to station objects for easy access
  const stationMap = new Map();
  stations.forEach(station => stationMap.set(station.station_id, station));
  

  // Create a priority queue for Dijkstra's algorithm
  const queue = new PriorityQueue((a, b) =>{
  
   return a.distance - b.distance
  });


   // Initialize distances and previous stations
   const distances = new Map();
   const previousStations = new Map();



   stations.forEach(station => {
    distances.set(station.station_id, Infinity);
    previousStations.set(station.station_id, null);
  });
   
  

  distances.set(startStationId, 0);
  queue.enq({ stationId: startStationId, distance: 0 });

 // console.log("before", queue);
  

  while (!queue.isEmpty()) {
   // console.log("in the begining of the loop",queue);
    const { stationId: currentStationId, distance: currentDistance } = queue.deq();
  
    if (currentStationId === endStationId) {
    //  console.log("this is current before update", currentStationId);
      const shortestPath = [];
      let current = endStationId;
      //console.log("current varaible",current);
      while (current !== null) {
        shortestPath.unshift(current);
        current = previousStations.get(current);
       // console.log("current varaible",current);
      }
      return shortestPath;
    }

    const currentStation = stationMap.get(currentStationId);

    // Extract connected station IDs and convert to an array
    const connectedStationIds = currentStation.connected_stations.split(',').map(Number);
    // console.log(currentStationId);
    // console.log(connectedStationIds);

    for (const nextStationId of connectedStationIds) {
      //const nextStation = stationMap.get(nextStationId);
      const weight = 5; // For simplicity, assuming time train takes 5 minutes from station to station
        

     // if (![101,102,103].includes(currentStationId)) {
       // console.log("checking current station",currentStationId);
      var distanceToNext = currentDistance + weight;
     // }

      if (distanceToNext < distances.get(nextStationId)) {

        distances.set(nextStationId, distanceToNext);
        previousStations.set(nextStationId, currentStationId);
        queue.enq({ stationId: nextStationId, distance: distanceToNext });
      //  console.log("after", queue);
      }
     // console.log(distanceToNext)
    }
  }

return null;
}
  module.exports = {
    calculateOtherPaths
  };
  