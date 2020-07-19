import Sequelize from 'sequelize';

const session = db => {
    const session = db.define('session', {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        expires: {
            type: Sequelize.DATE
        },
        data: {
            type: Sequelize.STRING(50000)
        }
      });
  
    return session;
  };
  export default session;