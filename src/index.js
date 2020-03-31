const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const authMiddleware = require("../src/middlewares/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(authMiddleware);
app.listen(process.env.PORT || 3333);