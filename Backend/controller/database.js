const db_ = require('../config/config');

exports.cargaMasiva = async(req,res)=>{
    var json_  = req.body.departamentos.departamento;

    if(json_.nombre){
        await departamento('null',json_)
    }
    else{
        for(var k in json_) {
            await departamento('null',json_[k])
         }
    }
    
    res.json({ "message" : 'Archivo cargado'})
}

async function departamento(id_padre,dep){
    sql = `insert into departamento(id_departamento_aux,nombre,capital) select ${id_padre}, '${dep.nombre}',${dep.capital_total} from dual
        where not exists(select * from departamento where (
            nombre = '${dep.nombre}' 
        ))`;
    res = await execute(sql)

    if(dep.puestos){
        json_= dep.puestos.puesto;
        sql = `select id_departamento from departamento where nombre = '${dep.nombre}'`
        res = await execute(sql)
        id_dep_aux = res.rows[0][0]
        if(json_.nombre){
            await puesto(id_dep_aux,json_)
        }
        else{
            for(var k in json_) {
                await puesto(id_dep_aux,json_[k])
             }
        }
    }
}
async function puesto(id_dep, puesto){
    imagen  = 'null'
    if(puesto.imagen){
        imagen = `'${puesto.imagen}'`
    }
    sql = `insert into puesto(id_puesto_departamento, nombre,salario,calificacion,url_imagen) 
        select ${id_dep}, '${puesto.nombre}',${puesto.salario},0,${imagen} from dual
        where not exists(select * from puesto where (
            nombre = '${puesto.nombre}' and
            id_puesto_departamento = ${id_dep}
        ))`;
    console.log(sql)
    res = await execute(sql)
}
async function execute(query){
    let result = await db_.Open(sql,[],true).catch((e) => { console.error(e);})
    return result;
}