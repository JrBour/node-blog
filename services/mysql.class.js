const mysql = require('mysql');

class MYSQLClass {

    constructor(){
        // Set MySQL connection
        this.connection = mysql.createConnection({
            host     : process.env.MYSQL_HOST,
            port     :  process.env.MYSQL_PORT,
            user     : process.env.MYSQL_USER,
            password : process.env.MYSQL_PASS,
            database : process.env.MYSQL_DB
        })
    }

    connectDb(){
        return new Promise( (resovle, reject) => {
            this.connection.connect( (connectionError) => {
                if (connectionError) {
                    return reject(connectionError)
                }
                else{
                    return resovle(this.connection);
                };
            });
        })
    }
}

module.exports = MYSQLClass