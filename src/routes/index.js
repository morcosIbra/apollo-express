import auth from './auth';
import express from 'express';
const router = express.Router();

const routes = function (app) {
    app.use('/auth', auth);
};

export default routes; 