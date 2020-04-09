/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();

    // Inner
    const mysql = require('mysql');
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
                router.post('/:endpoint', (req, res) => {
                    return res.json({ msg: 'CRUD: Create route', endpoint: req.params.endpoint })
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
                    return res.json({ msg: 'CRUD: Read one route', endpoint: req.params.endpoint, id: req.params.id })
                })
            //

            /* 
            CRUD: Update route 
            */
                router.put('/:endpoint/:id', (req, res) => {
                    return res.json({ msg: 'CRUD: Update route', endpoint: req.params.endpoint, id: req.params.id })
                })
            //

            /* 
            CRUD: Delete route 
            */
                router.delete('/:endpoint/:id', (req, res) => {
                    return res.json({ msg: 'CRUD: Delete route', endpoint: req.params.endpoint, id: req.params.id })
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