const {Router} = require('express');
const router = Router();
const db_ = require('../config/config');

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "ruta estatus 200"
    });
});

router.get('/fromoracle', async (req,res)=>{
    sql = "select * from usuario"
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    console.log(result.rows);
    res.status(200).json({
        message: result.rows
    });
    
});
module.exports = router;