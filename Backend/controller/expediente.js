const db_ = require('../config/config');

exports.getExps = async(req,res)=>{
    sql = `select e.id_expediente,e.dpi,e.nombres,e.apellidos,e.correo,e.direccion,e.telefono,e.url_cv 
    from solicitud s 
    inner join expediente e on e.id_expediente = s.id_solicitud_expediente
    where s.id_solicitud_usuario_encargado = (select id_usuario from usuario us where us.usuario = '${req.params.id_revisor}')`
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
            "url": exp[7]
        }
        return(expSchema)
    });
    res.status(200).json(exps);
}