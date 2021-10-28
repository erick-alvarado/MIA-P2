const {Router} = require("express");
const router = Router();
const loginController = require('../controller/login')

router.get("/user",loginController.LogIn)


module.exports = router;