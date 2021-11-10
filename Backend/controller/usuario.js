const db_ = require('../config/config');
const mail = require('../mail/mail')

exports.getUsuarios = async(req,res)=>{
    sql = `select u.id_usuario,p.nombre,u.usuario,u.contrasena,u.fecha_inicio,u.fecha_fin,u.rol from usuario u
    inner join departamento p ON p.id_departamento = u.id_usuario_departamento
    left join solicitud s ON s.id_solicitud_usuario = u.id_usuario
    where u.estado = 1`
    if(req.params.id){
        sql+= ` and p.id_departamento =  (select us.id_usuario_departamento from usuario us where us.usuario = '${req.params.id}')    `
        if(req.params.type==='personal'){
            sql+= ` and s.estado = 'asociado'`
        }
        else{
            sql+= ` and u.rol = 'usuario'  and s.estado = 'activo'`
        }
    }
    else{
        sql+=` and (u.rol = 'coordinador' OR u.rol = 'reclutador')`
    }
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
    sql = `update usuario set estado= 0, fecha_fin = CURRENT_TIMESTAMP where id_usuario = ${id_usuario}`
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
exports.asociarUsuario = async(req,res)=>{
    const{id_usuario,usuario} = req.body;

    sql = `update solicitud set 
            estado = 'asociado'
        where id_solicitud_usuario = ${id_usuario}`
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})

    sql = `select e.correo from expediente e where e.dpi = ${usuario}`
    console.log(sql)
    result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    console.log(result)
    let email = result.rows[0][0]
    await mail.Send(email,`Usted ha sido asociado a la empresa, por favor presentarse el dia de mañana a las oficinas`)

    res.status(200).json({message:'Usuario asociado'});
}