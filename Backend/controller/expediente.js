const db_ = require('../config/config');
const mail = require('../mail/mail')
exports.getExps = async(req,res)=>{
    sql = `select e.id_expediente,e.dpi,e.nombres,e.apellidos,e.correo,e.direccion,e.telefono,e.url_cv,s.id_solicitud_puesto
    from solicitud s 
    inner join expediente e on e.id_expediente = s.id_solicitud_expediente
    where s.id_solicitud_usuario_encargado = (select id_usuario from usuario us where us.usuario = '${req.params.id_revisor}')
            and s.estado = 'pendiente'`
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    let exps =[]
    exps = result.rows.map(exp=> {
        let expSchema = {
            "id": exp[0],
            "dpi": exp[1],
            "nombres": exp[2],
            "apellidos": exp[3],
            "correo": exp[4],
            "direccion": exp[5],
            "telefono": exp[6],
            "url": exp[7],
            "id_puesto": exp[8]
        }
        return(expSchema)
    });
    res.status(200).json(exps);
}

exports.recluit = async(req,res)=>{
    const{id,dpi,id_puesto,email} = req.body
    
    
    let sql  = `insert into usuario ( id_usuario_departamento, usuario, contrasena, fecha_inicio, rol,estado) values (
        (select p.id_puesto_departamento from puesto p where p.id_puesto = ${id_puesto})
        ,'${dpi}','123',CURRENT_TIMESTAMP,'usuario',1)`
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})

    sql = `update solicitud s set s.estado = 'activo' ,s.id_solicitud_usuario = (select u.id_usuario from usuario u where u.usuario = '${dpi}')
    where s.id_solicitud_expediente = ${id}`
    result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})

    await mail.Send(email,`Ahora posee acceso al sistema. Sus credenciales son:\n Usuario:${dpi} \n Contraseña: 123`)
    res.status(200).json({message: 'Se registro al usuario!'});
}

exports.decline = async(req,res)=>{
    const{id_expediente} = req.body
    sql = `delete from solicitud where id_solicitud_expediente = ${id_expediente}`
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    sql =    `delete from expediente where id_expediente = ${id_expediente}`
    result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    res.status(200).json({message: 'Expediente rechazado!'});
}