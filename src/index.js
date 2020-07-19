import { db } from './db/config';
import express from 'express';
import authMiddleware from './middlewares/auth';
import stateMiddleware from './middlewares/state';
import localiseMiddleware from './middlewares/localisation';
import routes from './routes';

require('dotenv').config();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.instance.sync();
localiseMiddleware(app)
authMiddleware(app)
routes(app);
stateMiddleware(app)
app.listen(3000);






