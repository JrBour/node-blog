const mysql = require('mysql');

class MYSQLCrudClass {

    constructor( host, port, user, password, database, endpoint ){
        this.endpoint = endpoint;
        this.connection = mysql.createConnection({
            host     : host,
            port     : port,
            user     : user,
            password : password,
            database : database
        })
    }

    connectDb(){
        return new Promise( (resovle, reject) => {
            // Connect the DB
            this.connection.connect( (connectionError) => {
                return connectionError ? resovle('DB is connected') : reject(connectionError);
            });
        })
    }

    readAllItems(){
        return new Promise( (resovle, reject) => {
            // Connect the DB
            this.connection.connect( (connectionError) => {
                if( connectionError ){
                    return reject(connectionError)
                }
                else{
                    // Get all item from table :endpoint
                    this.connection.query(`SELECT * FROM post`, (queryError, results, fields) => {
                        return queryError ? resovle(results) : reject(queryError);
                    });
                }
            });


            
        })
    }
}

module.exports = MYSQLCrudClass