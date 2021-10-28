//node src/index.js
//npm run server
const { requiresAuth } = require('express-openid-connect');
const { auth } = require('express-openid-connect');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
const loadenv = require('dotenv').config()
const loginRouter = require('../routes/login.js')


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL:  process.env.AUTH_ISSUER
};


app.use(auth(config));


app.set('port',process.env.PORT_NODE)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())

//app.use("/login", loginRouter)

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
  console.log(req.oidc.user)
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
