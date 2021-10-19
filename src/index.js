//node src/index.js
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const loadenv = require('dotenv').config()

app.set('port',process.env.PORT_NODE)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });