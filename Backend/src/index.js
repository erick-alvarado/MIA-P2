//node src/index.js
//npm run server
const { requiresAuth } = require('express-openid-connect');
const { auth } = require('express-openid-connect');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const Multer = require('multer');


const app = express();
const loadenv = require('dotenv').config()
const loginRouter = require('../routes/login.js')
const databaseRouter = require('../routes/database')
const departamentoRouter = require('../routes/departamento')
const usuarioRouter = require('../routes/usuario')
const puestoRouter = require('../routes/puesto')
const bucketRouter = require('../routes/bucket')
const expedienteRouter = require('../routes/expediente')





const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL:  process.env.AUTH_ISSUER
  /*clientSecret:process.env.AUTH_CLIENT_SECRET,

  authorizationParams: {
    response_type: 'code',
    audience: process.env.AUTH_ISSUER,
    scope: 'openid profile email offline_access read:products',
  }*/
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

app.use("/database",databaseRouter);
app.use("/departamento",departamentoRouter);
app.use("/usuario",usuarioRouter);
app.use("/puesto",puestoRouter);
app.use("/expediente",expedienteRouter);

app.use("/upload", multer.single('file'),bucketRouter);



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
