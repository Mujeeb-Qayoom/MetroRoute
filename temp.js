const PriorityQueue = require('priorityqueuejs'); // Import the priority queue library
const Station = require('./models/Station'); // Import your Sequelize model for Station

const calculateShortestPath = async (startStationId, endStationId) => {
  // Fetch station data from the database
  const stations = await Station.findAll();

  // Create a map of station IDs to station objects for easy access
  const stationMap = new Map();
  stations.forEach(station => stationMap.set(station.station_id, station));

  // Create a priority queue for Dijkstra's algorithm`
  const queue = new PriorityQueue((a, b) => a.distance - b.distance);

  // Initialize distances and previous stations
  const distances = new Map();
  const previousStations = new Map();

  stations.forEach(station => {
    distances.set(station.station_id, Infinity);
    previousStations.set(station.station_id, null);
  });

  distances.set(startStationId, 0);
  queue.enq({ stationId: startStationId, distance: 0 });

  while (!queue.isEmpty()) {
    const { stationId: currentStationId, distance: currentDistance } = queue.deq();

    if (currentStationId === endStationId) {
      const shortestPath = [];
      let current = endStationId;

      while (current !== null) {
        shortestPath.unshift(current);
        current = previousStations.get(current);
      }

      return shortestPath;
    }

    const currentStation = stationMap.get(currentStationId);

    // Extract connected station IDs and convert to an array
    const connectedStationIds = currentStation.connected_stations.split(',').map(Number);

    for (const nextStationId of connectedStationIds) {
      const nextStation = stationMap.get(nextStationId);
      const weight = 1; // For simplicity, assuming all connections have equal weight

      const distanceToNext = currentDistance + weight;
      if (distanceToNext < distances.get(nextStationId)) {
        distances.set(nextStationId, distanceToNext);
        previousStations.set(nextStationId, currentStationId);
        queue.enq({ stationId: nextStationId, distance: distanceToNext });
      }
    }
  }

  return null; // No path found
};

// Example usage
const startStationId = 1; // Replace with actual start station ID
const endStationId = 62; // Replace with actual end station ID

const shortestPath = calculateShortestPath(startStationId, endStationId);
console.log('Shortest path:', shortestPath);
