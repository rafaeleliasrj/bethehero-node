const express = require('express');
const authMiddleware = require("../src/middlewares/auth");
const OngController = require('./controllers/OngController');
const UserController = require('./controllers/UserController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions/ong', SessionController.loginOng);
routes.post('/sessions/user', SessionController.loginUser);

routes.post('/ongs', OngController.create);
routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/ongs', OngController.index);

routes.get('/users', UserController.index);

routes.get('/profile', ProfileController.index); 

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;