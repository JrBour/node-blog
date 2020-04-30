/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();

    // Inner
    const PostModel = require('../models/post.schema');
    const CommentModel = require('../models/comment.schema');
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
                        });
                    }
                    else if(req.params.endpoint === 'comment'){
                        // Define post data
                        data = {
                            content: req.body.content,
                            subject: req.body.subject,
                            author: req.body.author
                        }

                        // MONGODB Create new document in 'posts' collection
                        CommentModel.create(data)
                        .then( document => {
                            return res.json( { msg: 'Document created!', data: document, err: null } );
                        })
                        .catch( mongoError => {
                            return res.json( { msg: 'Document not created...', data: null, err: mongoError } );
                        });
                    }             
                });
            //

            /* 
            CRUD: Read all route 
            */
                router.get('/:endpoint', (req, res) => {
                    // Get all item from table :endpoint
                    PostModel.find( (mongoError, documents) => {
                        if( mongoError ){
                            return res.json( { msg: 'Documents not found...', data: null, err: mongoError });
                        }
                        else{
                            return res.json( { msg: 'Documents found!', data: documents, err: null } );
                        }
                    })
                })
            //

            /* 
            CRUD: Read one route
            */
                router.get('/:endpoint/:id', async (req, res) => {

                    // Check endpoint
                    if(req.params.endpoint === 'post'){
                        PostModel.findById( req.params.id, (mongoError, document) => {
                            if( mongoError ){
                                return res.json( { msg: 'Document not found...', data: null, err: mongoError });
                            }
                            else{
                                return res.json( { msg: 'Document found!', data: document, err: null } );
                            }
                        });
                    };
                })
            //

            /* 
            CRUD: Update route 
            */
                router.put('/:endpoint/:id', (req, res) => {
                    // Check endpoint
                    if(req.params.endpoint === 'post'){
                        PostModel.findById( req.params.id, (mongoError, document) => {
                            if( mongoError ){
                                return res.json( { msg: 'Document not found...', data: null, err: mongoError });
                            }
                            else{
                                // Update documeent data
                                document.title = req.body.title;
                                document.content = req.body.content;

                                // Save document
                                document.save()
                                .then( updatedDocument => {
                                    return res.json( { msg: 'Document updated!', data: updatedDocument, err: null } );
                                })
                                .catch( mongSaveError => {
                                    return res.json( { msg: 'Document not updated...', data: null, err: mongSaveError });
                                });
                            };
                        });
                    };
                });
            //

            /* 
            CRUD: Delete route 
            */
                router.delete('/:endpoint/:id', (req, res) => {
                    PostModel.findOneAndDelete({ _id: req.params.id }, ( mongoError, mongoSucces ) => {
                        if( mongoError ){
                            return res.json( { msg: 'Document not deleted...', data: null, err: mongoError });
                        }
                        else{
                            return res.json( { msg: 'Document deleted!', data: mongoSucces, err: null } );
                        }
                    });
                });
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