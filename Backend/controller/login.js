const db_ = require('../config/config');

exports.LogIn = async(req,res)=>{
    sql = "select * from usuario where usuario != 'admin'"
    let result = await db_.Open(sql,[],{ autoCommit: true }).catch((e) => { console.error(e); return 'error!'})
    console.log(result.rows);
    const users =[]
    
    result.rows.map(user=> {
        let userSchema = {
            "id_usuario": user[0],
            "id_departamento": user[1],
            "usuario": user[2],
            "contrasena": user[3],
            "fecha_inicio":user[4],
            "fecha_fin":user[5],
            "rol": user[6]
        }
        users.push(userSchema);
    });

    res.status(200).json({
        users
    });
}