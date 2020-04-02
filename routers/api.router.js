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
                router.post('/', (req, res) => {
                    return res.json({ msg: 'CRUD: Create route' })
                })
            //

            /* 
            CRUD: Read all route 
            */
                router.get('/', (req, res) => {
                    return res.json({ msg: 'CRUD: Read all route' })
                })
            //

            /* 
            CRUD: Read one route
            */
                router.get('/:id', (req, res) => {
                    return res.json({ msg: 'CRUD: Read one route', id: req.params.id })
                })
            //

            /* 
            CRUD: Update route 
            */
                router.put('/:id', (req, res) => {
                    return res.json({ msg: 'CRUD: Update route', id: req.params.id })
                })
            //

            /* 
            CRUD: Delete route 
            */
                router.delete('/:id', (req, res) => {
                    return res.json({ msg: 'CRUD: Update route', id: req.params.id })
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