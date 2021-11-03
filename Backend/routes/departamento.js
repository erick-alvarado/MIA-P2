const {Router} = require("express");
const router = Router();
const depController = require('../controller/departamento')

router.get("/",depController.getDepartamentos)


module.exports = router;