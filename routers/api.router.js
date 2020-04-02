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

            router.get('/', (req, res)=> {
                return res.json({ msg: 'Hello API' })
            })
            
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