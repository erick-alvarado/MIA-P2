const db_ = require('../config/config');
exports.postularse = async(req,res)=>{
    const{id_puesto,dpi,nombres,apellidos,correo,telefono,direccion,url} = req.body;
    sql = `insert into expediente ( dpi, nombres,apellidos,correo,direccion,telefono,url_cv) 
    values ( ${dpi}, '${nombres}' ,'${apellidos}','${correo}','${direccion}',${telefono},'${url}')`
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})

    sql = `
        WITH empleados AS (
            select * from usuario u 
            inner join departamento d on d.id_departamento = u.id_usuario_departamento
            inner join puesto p on p.id_puesto_departamento = d.id_departamento
            where p.id_puesto = ${id_puesto} AND
                u.rol = 'reclutador' AND
                u.estado = 1
        ),solicitudes AS (
            select e.id_usuario, 
            (select count(*) from solicitud s where s.id_solicitud_usuario_encargado = e.id_usuario) 
            pendientes from empleados e
        )
        select * from solicitudes s order by s.pendientes asc`
    result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    var id_revisor_libre = result.rows[0][0]
    sql = `insert into solicitud (id_solicitud_puesto, id_solicitud_expediente,id_solicitud_usuario_encargado,estado) values (${id_puesto},
        (select id_expediente from expediente where url_cv = '${url}')
        ,${id_revisor_libre},'pendiente')`
    result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    res.status(200).json({message:'Postulacion realizada!'});
}
exports.setEstrellas = async(req,res)=>{
    const{id_puesto,estrellas} = req.body;
    sql = `update puesto set calificacion = calificacion +${estrellas} , votos = votos +1 where id_puesto = ${id_puesto}`
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e); return 'error!'})
    res.status(200).json({message:'Calificacion realizada!'});
}
exports.getPuestos = async(req,res)=>{
    sql = `select * from puesto p`
    if(req.params.search){
        sql+=` where 
        p.nombre like '%${req.params.search}%' collate binary_ci OR
        p.nombre like '${req.params.search}%' collate binary_ci OR
        p.nombre like '%${req.params.search}' collate binary_ci`
    }
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    let puestos =[]
    puestos = await Promise.all(result.rows.map(async(user)=> {
        let puestoSchema = {
            "id_puesto": user[0],
            "nombre": user[2],
            "salario": user[3],
            "calificacion": user[4],
            "url_imagen": user[5],
            "votos":user[6],
            "categorias": await getCategorias(user[0])
        }
        return(puestoSchema)
    }));
    res.status(200).json(puestos);
}
async function getCategorias(id_puesto){
    sql = `select c.nombre from detalle_categoria det
            inner join puesto p ON p.id_puesto = det.id_detalle_categoria_puesto
            inner join categoria c ON c.id_categoria = det.id_detalle_categoria_categoria
            where p.id_puesto = ${id_puesto}`
    let result = await db_.Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    let categorias =[]
    categorias = result.rows.map(cat=> {
        let categoriaSchema = {
            "categoria": cat[0]
        }
        return(categoriaSchema)
    });
    return categorias;
}