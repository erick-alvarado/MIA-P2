const { json } = require('express');
const oracledb = require('oracledb');
    const credentials = {
      user: process.env.USER_ORACLE,
      password: process.env.PASSWORD_ORACLE,
      connectString: process.env.HOST_ORACLE+":"+process.env.PORT_ORACLE+"/orcl18"
   }
 exports.oracleConnection  = async (req, res) => {
    
   console.log(req.body)
    const user= req.body.user;
    const password =req.body.password
    const sql = `select * from usuario where usuario ='${user}' AND contrasena = '${password}'`;
    let result = await Open(sql,[],false).catch((e) => { console.error(e); return 'error!'})
    if(result.rows.length>0){
      admin = result.rows.map(u =>{
        var profile = {
            "id_usuario": u[0],
            "id_departamento": u[1],
            "usuario": u[2],
            "rol": u[6]
        };
        console.log(profile)
        res.status(200).json({
          profile
        });
      })
    }
    else{
      res.status(200).json({
        message : 'nel chavo'
      });
    }
    
};
async function Open(query, binds, autoCommit) {
    let connection = await oracledb.getConnection(credentials);
    let result = await connection.execute(query, binds, { autoCommit });
    connection.release();
    return result;
}
