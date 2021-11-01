const {Router} = require("express");
const router = Router();
const databaseController = require('../controller/database')

router.post("/cargaMasiva",databaseController.cargaMasiva)


module.exports = router;