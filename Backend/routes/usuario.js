const {Router} = require("express");
const router = Router();
const usuarioController = require('../controller/usuario')

router.post("/",usuarioController.postUsuario)
router.post("/delete",usuarioController.deleteUsuario)
router.get("/",usuarioController.getUsuarios)


module.exports = router;