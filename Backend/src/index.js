//node src/index.js
//npm run server
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const loadenv = require('dotenv').config()
const loginRouter = require('../routes/login.js')

app.set('port',process.env.PORT_NODE)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

app.use("/login", loginRouter)


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
