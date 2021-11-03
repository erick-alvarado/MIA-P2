const db_ = require('../config/config');

exports.getUsuarios = async(req,res)=>{
    sql = "select * from usuario "
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    let deps =[]
    deps = result.rows.map(user=> {
        let depSchema = {
            "id_departamento": user[0],
            "nombre": user[1]
        }
        return(depSchema)
    });
    res.status(200).json(deps);
}
exports.postUsuario = async(req,res)=>{
    const{usuario,contrasena,departamento,rol} = req.body;
    sql = `insert into usuario ( id_usuario_departamento, usuario, contrasena, fecha_inicio, rol) values 
    ((SELECT id_departamento from departamento where nombre = '${departamento}'),'${usuario}','${contrasena}',CURRENT_TIMESTAMP,'${rol}')`

    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    
    res.status(200).json({message:'Usuario almacenado'});
}