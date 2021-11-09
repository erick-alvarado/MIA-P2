const {Router} = require("express");
const router = Router();
const expedienteController = require('../controller/expediente')

router.get("/:id_revisor",expedienteController.getExps)
router.post("/reclutar",expedienteController.recluit)
router.post("/rechazar",expedienteController.decline)


module.exports = router;