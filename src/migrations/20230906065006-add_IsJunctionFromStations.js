'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Remove the is_junction column from the stations table
    return queryInterface.addColumn('Stations', 'is_junction',{
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    // Add the is_junction column back to the stations table (if needed)
    return queryInterface.removeColumn('stations', 'is_junction', {
      // Adjust the default value if needed
    });
  },
};
