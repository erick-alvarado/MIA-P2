const db_ = require('../config/config');

exports.getUsuarios = async(req,res)=>{
    sql = `select u.id_usuario,p.nombre,u.usuario,u.contrasena,u.fecha_inicio,u.fecha_fin,u.rol from usuario u
    inner join departamento p ON p.id_departamento = u.id_usuario_departamento
    where u.estado = 1`
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    let users =[]
    users = result.rows.map(user=> {
        let userSchema = {
            "id": user[0],
            "departamento": user[1],
            "usuario": user[2],
            "contrasena": user[3],
            "fecha_inicio": user[4],
            "fecha_fin": user[5],
            "rol": user[6]

        }
        return(userSchema)
    });
    res.status(200).json(users);
}
exports.postUsuario = async(req,res)=>{
    const{usuario,contrasena,departamento,rol} = req.body;
    sql = `insert into usuario ( id_usuario_departamento, usuario, contrasena, fecha_inicio, rol,estado) values 
    ((SELECT id_departamento from departamento where nombre = '${departamento}'),'${usuario}','${contrasena}',CURRENT_TIMESTAMP,'${rol}',1)`

    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    
    res.status(200).json({message:'Usuario almacenado'});
}
exports.deleteUsuario = async(req,res)=>{
    const{id_usuario} = req.body;
    sql = `update usuario set estado= 0 where id_usuario = ${id_usuario}`
    console.log(sql)
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    res.status(200).json({message:'Usuario eliminado'});
}
exports.updateUsuario = async(req,res)=>{
    const{usuario,contrasena,departamento,rol,id_usuario} = req.body;

    sql = `update usuario set 
            id_usuario_departamento = (SELECT id_departamento from departamento where nombre = '${departamento}'),
            usuario = '${usuario}',
            contrasena = '${contrasena}',
            rol = '${rol}'
        where id_usuario = ${id_usuario}`
    console.log(sql)
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    res.status(200).json({message:'Usuario modificado'});
}