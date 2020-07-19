import Sequelize from 'sequelize';

const trip = db => {
    const trip = db.define('trip', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        launchId: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
      });
  
    return trip;
  };
  export default trip;