/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();

    // Inner
    const PostModel = require('../models/post.schema');
//

/*
Routes definition
*/
    class CrudMongoRouterClass {

        // Inject Passport to secure routes
        constructor() {}
        
        // Set route fonctions
        routes(){

            /* 
            CRUD: Create route 
            */
                router.post('/:endpoint', (req, res) => {
                // Set empty data
                let data = {};

                // Check endpoint
                if(req.params.endpoint === 'post'){
                    // Define post data
                    data = {
                        title: req.body.title,
                        content: req.body.content
                    }

                    // MONGODB Create new document in 'posts' collection
                    PostModel.create(data)
                    .then( document => {
                        return res.json( { msg: 'Document created!', data: document, err: null } );
                    })
                    .catch( mongoError => {
                        return res.json( { msg: 'Document not created...', data: null, err: mongoError } );
                    })
                }                
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
    module.exports = CrudMongoRouterClass;
//