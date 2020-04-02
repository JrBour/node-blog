/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();
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
                    return res.json({ msg: 'CRUD: Read all route', endpoint: req.params.endpoint })
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