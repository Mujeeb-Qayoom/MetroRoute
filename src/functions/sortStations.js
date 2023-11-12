module.exports = {

sortStations :  async (data,Path) =>{


  //   Create a map to index stationData by station ID
  const stationMap = new Map();
  data.forEach(station => stationMap.set(station.station_id, station));
  //   Sort the results to match the order in the shortestPath array
  const sortedStationData = Path.map(stationId => ({
    station_id  : stationMap.get(stationId).station_id,
    station_name: stationMap.get(stationId).station_name,
    line_color  : stationMap.get(stationId).line_color,
    is_junction : stationMap.get(stationId).is_junction,
  }));

    return sortedStationData;
}
   


}