//Para hacer publico el acceso de archivos del bucket: gsutil defacl set public-read gs://bucket
const {format} = require('util');

const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename:process.env.GCLOUD_STORAGE_BUCKET,
  projectId: process.env.GCLOUD_PROYECT_ID
})

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_NAME);


exports.saveFile = (req, res, next) => {
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
}
