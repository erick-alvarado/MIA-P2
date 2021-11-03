const db_ = require('../config/config');

exports.getDepartamentos = async(req,res)=>{
    sql = "select id_departamento,nombre from departamento "
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