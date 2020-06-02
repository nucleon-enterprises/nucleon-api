const express = require('express');

const routes = express.Router();
const authRoutes = express.Router();
const internalRoutes = express.Router();

const authController = require('./controllers/authController');

const authMiddleware = require('./middlewares/auth');
const internalMiddleware = require('./middlewares/internal');

authRoutes.post('/register', authController.register);
authRoutes.post('/authenticate', authController.authenticate);

internalRoutes.use(internalMiddleware);
internalRoutes.get('/show/:id', authController.show);

routes.use('/auth', authRoutes);
routes.use('/internal', internalRoutes);


module.exports = routes;