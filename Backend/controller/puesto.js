const db_ = require('../config/config');

exports.getPuestos = async(req,res)=>{
    sql = `select * from puesto`
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