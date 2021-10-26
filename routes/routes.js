const {Router} = require('express');
const router = Router();
const db = ('../config/config');

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "ruta estatus 200"
    });
});


module.exports = router;