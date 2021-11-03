const {Router} = require("express");
const router = Router();
const usuarioController = require('../controller/usuario')

router.post("/",usuarioController.postUsuario)
router.get("/",usuarioController.getUsuarios)


module.exports = router;