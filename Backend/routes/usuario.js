const {Router} = require("express");
const router = Router();
const usuarioController = require('../controller/usuario')

router.post("/",usuarioController.postUsuario)


module.exports = router;