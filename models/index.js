import Sequelize from 'sequelize';
import config from "./config"

const sequelize = new Sequelize(config.database, config.username, config.password,{
    dialect: 'postgres',
    define: {
        underscored:true,
    }
  });

const models = {
    User : sequelize.import("./users"),
    Channel : sequelize.import("./channels"),
    Message : sequelize.import("./messages"),
    Team : sequelize.import("./teams"),
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
      }
});
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;