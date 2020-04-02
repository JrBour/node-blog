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
    class AuthRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes(){

            router.get('/', (req, res)=> {
                return res.json({ msg: 'Hello /api/auth' })
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
    module.exports = AuthRouterClass;
//