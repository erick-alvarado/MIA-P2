const db_ = require('../config/config');

exports.cargaMasiva = async(req,res)=>{
    let json_  = req.body.departamentos.departamento;

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
    let sql = `insert into departamento(id_departamento_aux,nombre,capital) select ${id_padre}, '${dep.nombre}',${dep.capital_total} from dual
        where not exists(select * from departamento where (
            nombre = '${dep.nombre}' 
        ))`;
    let res = await execute(sql)

    if(dep.puestos){
        let json_= dep.puestos.puesto;
        let sql = `select id_departamento from departamento where nombre = '${dep.nombre}'`
        let res = await execute(sql)
        let id_dep_aux = res.rows[0][0]
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
    let imagen  = 'null'
    if(puesto.imagen){
        imagen = `'${puesto.imagen}'`
    }
    let sql = `insert into puesto(id_puesto_departamento, nombre,salario,calificacion,url_imagen) 
        select ${id_dep}, '${puesto.nombre}',${puesto.salario},0,${imagen} from dual
        where not exists(select * from puesto where (
            nombre = '${puesto.nombre}' and
            id_puesto_departamento = ${id_dep}
        ))`;
    let res = await execute(sql)

    sql = `select id_puesto from puesto where nombre = '${puesto.nombre}' and id_puesto_departamento = ${id_dep}`
    res = await execute(sql)
    let id_puesto_aux = res.rows[0][0]
    
    if(puesto.categorias){
        let json_= puesto.categorias.categoria;
        if(json_.nombre){
            await categoria(id_puesto_aux,json_)
        }
        else{
            for(var k in json_) {
                await categoria(id_puesto_aux,json_[k])
            }
        }
    }
}
async function categoria(id_puesto, cat){
    let sql = `insert into categoria(nombre) select '${cat.nombre}' from dual
        where not exists(select * from categoria where (
            nombre = '${cat.nombre}' 
        ))`;
    let res = await execute(sql)
    sql = `select id_categoria from categoria where nombre = '${cat.nombre}'`
    res = await execute(sql)
    let id_categoria = res.rows[0][0]


    sql = `insert into detalle_categoria(id_detalle_categoria_categoria,id_detalle_categoria_puesto) 
    select ${id_categoria},${id_puesto} from dual
        where not exists(select * from detalle_categoria where (
            id_detalle_categoria_categoria = ${id_categoria}  and
            id_detalle_categoria_puesto =  ${id_puesto}
        ))`;
    console.log(sql)
    res = await execute(sql)
}
async function execute(query){
    let result = await db_.Open(query,[],true).catch((e) => { console.error(e);})
    return result;
}