const {Router} = require("express");
const router = Router();
const puestoController = require('../controller/puesto')

router.get("/",puestoController.getPuestos)
router.post("/estrellas",puestoController.setEstrellas)



module.exports = router;