const db_ = require('../config/config');

exports.cargaMasiva = async(req,res)=>{
    console.log(req.body.departamentos)
    res.json({ "message" : 'Archivo cargado'})
}