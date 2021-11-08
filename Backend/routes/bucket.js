const {Router} = require("express");
const router = Router();
const bucketController = require('../controller/bucket')

router.post("/",bucketController.saveFile)


module.exports = router;