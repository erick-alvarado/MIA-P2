const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
//const loadenv = require('dotenv').config()

const functionNode = require('./routes/user');

app.set('port',process.env.PORT_NODE)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.use("/", functionNode)

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
