const oracledb = require('oracledb');

credentials = {
    user: process.env.USER_ORACLE,
    password: process.env.PASSWORD_ORACLE,
    connectString: process.env.HOST_ORACLE+":"+process.env.PORT_ORACLE
}

try {
    oracledb.initOracleClient({libDir: ''});
} catch (err) {
    console.error('ERR CONNECTING TO ORACLE! f');
}

async function Open(query, binds, autoCommit) {

    let connection = await oracledb.getConnection(credentials);
    let result = await connection.execute(query, binds, { autoCommit });
    connection.release();
    return result;
}

exports.Open = Open;