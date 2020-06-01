const express = require('express');

const routes = express.Router();
const authRoutes = express.Router();
//const somethingRoutes = express.Router();

const authController = require('./controllers/authController');

const authMiddleware = require('./middlewares/auth');

authRoutes.post('/register', authController.register);
authRoutes.post('/authenticate', authController.authenticate);

//somethingRoutes.get('/show', authController.show);

//somethingRoutes.use(authMiddleware);

routes.use('/auth', authRoutes);
//routes.use('/something', somethingRoutes);


module.exports = routes;