const {Router} = require("express");
const router = Router();
const puestoController = require('../controller/puesto')

router.get("/",puestoController.getPuestos)


module.exports = router;