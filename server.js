/* 
Import
*/
    // NodeJS
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bodyParser = require('body-parser'); //=> https://www.npmjs.com/package/body-parser
    const cookieParser = require('cookie-parser'); //=> https://www.npmjs.com/package/cookie-parser
    const path = require('path'); //=> https://www.npmjs.com/package/path
    const passport = require('passport'); //=> https://www.npmjs.com/package/passport
//

/* 
Config
*/
    // Declarations
    const server = express();
    const port = process.env.PORT;

    // Server class
    class ServerClass{
        init(){
            // Static path configuration
            server.set( 'views', __dirname + '/www' );
            server.use( express.static(path.join(__dirname, 'www')) );

            //=> Body-parser
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));

            //=> Use CookieParser to setup serverside cookies
            server.use(cookieParser(process.env.COOKIE_SECRET));

            // Start server
            this.launch();
        };

        routes(){
            // Set global API router
            const ApiRouterClass = require('./routers/api.router');
            const apiRouter = new ApiRouterClass();
            server.use('/api', apiRouter.init());

            // Set auth router
            const AuthRouterClass = require('./routers/auth.router');
            const authRouter = new AuthRouterClass();
            server.use('/api/auth', authRouter.init());

            // Set front router
            server.get('/*',  (req, res) => res.render('index') );
        };

        launch(){
            // Init Routers
            this.routes();

            // Launch server
            server.listen(port, () => console.log(`Server is running: http://localhost:${port}`))
        };
    }
//

/* 
Start
*/
    new ServerClass().init();
//