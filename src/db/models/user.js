import Sequelize from 'sequelize';

const user = db => {
    const user = db.define('user', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        hash: Sequelize.STRING,
        salt: Sequelize.STRING,
        username:Sequelize.STRING
      });
  
    return user;
  };
  export default user;