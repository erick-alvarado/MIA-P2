const {Router} = require("express");
const router = Router();
const expedienteController = require('../controller/expediente')

router.get("/:id_revisor",expedienteController.getExps)

module.exports = router;