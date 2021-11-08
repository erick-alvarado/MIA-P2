//node src/index.js
//npm run server
const { requiresAuth } = require('express-openid-connect');
const { auth } = require('express-openid-connect');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const Multer = require('multer');
const {format} = require('util');


const app = express();
const loadenv = require('dotenv').config()
const loginRouter = require('../routes/login.js')
const databaseRouter = require('../routes/database')
const departamentoRouter = require('../routes/departamento')
const usuarioRouter = require('../routes/usuario')
const puestoRouter = require('../routes/puesto')
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename:process.env.GCLOUD_STORAGE_BUCKET,
  projectId: 'mia-p2'
})

const bucket = storage.bucket('archivos-files');


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


app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });
  blobStream.end(req.file.buffer);
});


app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
