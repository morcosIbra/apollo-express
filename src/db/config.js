import Sequelize from 'sequelize';
import { models } from './models';

const instance = new Sequelize('test', 'root', 'admin', {
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
});

export const db = { instance, models: models(instance) };