/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();

    // NPM module
    const mysql = require('mysql');

    // inner
    const MYSQLCrudClass = require('../services/MYSQLcrud.class')
//

/*
Routes definition
*/
    class ApiRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes(){
            /* 
            CRUD: Create route 
            */
                router.get('/test/test', (req, res) => {
                    const MYSQLquery = new MYSQLCrudClass('localhost', 8889, 'root', 'root', 'api-node', 'post')

                    MYSQLquery.readAllItems()
                        .then( response => {
                            console.log(response)
                            return res.json({ msg: 'MYSQLclass: OK query', response })
                        })
                        .catch( err => {
                            console.log(err)
                            return res.json({ msg: 'MYSQLclass: error query', err })
                        })
                })
            
                router.post('/:endpoint', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api-node'
                    })
                    
                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            connection.query('INSERT INTO post SET ?', {
                                title: req.body.title,
                                content: req.body.content
                            }, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: ok query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
            //

            /* 
            CRUD: Read all route 
            */
                router.get('/:endpoint', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api-node'
                    })
                    
                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`SELECT * FROM ${req.params.endpoint}`, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
            //

            /* 
            CRUD: Read one route
            */
                router.get('/:endpoint/:id', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api-node'
                    })
                    
                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`SELECT * FROM ${req.params.endpoint} WHERE id = ${req.params.id}`, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
            //

            /* 
            CRUD: Update route 
            */
                router.put('/:endpoint/:id', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api-node'
                    })
                    
                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`
                                UPDATE ${req.params.endpoint} 
                                SET title = "${req.body.title}", content = "${req.body.content}" 
                                WHERE id = ${req.params.id}
                            `, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
            //

            /* 
            CRUD: Delete route 
            */
                router.delete('/:endpoint/:id', (req, res) => {
                    // Set MySQL connection
                    const connection = mysql.createConnection({
                        host     : 'localhost',
                        port     :  8889,
                        user     : 'root',
                        password : 'root',
                        database : 'api-node'
                    })
                    
                    // Connect the DB
                    connection.connect( (connectionError) => {
                        if (connectionError) {
                            return res.json({ msg: 'MYSQL: error connecting', err: connectionError })
                        }
                        else{
                            // Get all item from table :endpoint
                            connection.query(`
                                DELETE FROM ${req.params.endpoint} 
                                WHERE id = ${req.params.id}
                            `, (queryError, results, fields) => {
                                if (queryError) {
                                    return res.json({ msg: 'MYSQL: error query', err: queryError })
                                }
                                else{
                                    return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                                }
                            });
                        };
                    });
                })
            //            
        };

        // Start router
        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return router;
        };
    };
//

/*
Export
*/
    module.exports = ApiRouterClass;
//