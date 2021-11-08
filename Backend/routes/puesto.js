const {Router} = require("express");
const router = Router();
const puestoController = require('../controller/puesto')

router.get("/",puestoController.getPuestos)
router.get("/:search",puestoController.getPuestos)

router.post("/estrellas",puestoController.setEstrellas)
router.post("/postularse",puestoController.postularse)




module.exports = router;