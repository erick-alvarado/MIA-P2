const {Router} = require("express");
const router = Router();
const expedienteController = require('../controller/expediente')

router.get("/:id_revisor",expedienteController.getExps)
router.get("/:id_revisor/:aplicantes",expedienteController.getExps)

router.post("/reclutar",expedienteController.recluit)
router.post("/rechazar",expedienteController.decline)
router.post("/rechazar/doc",expedienteController.declineExp)
router.post("/aceptar",expedienteController.accept)


module.exports = router;