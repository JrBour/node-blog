require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

const path = require('path');

const MONGOclass = require('./services/mongo.class');

const server = express();
const port = process.env.PORT;

class ServerClass {
	constructor(){
		this.MONGO = new MONGOclass;
	}

	init(){
		server.engine( 'html', ejs.renderFile );
		server.set( 'view engine', 'html' );
		
		server.set( 'views', __dirname + '/www' );
		server.use( express.static(path.join(__dirname, 'www')) );

		server.use(bodyParser.json({limit: '10mb'}));
		server.use(bodyParser.urlencoded({ extended: true }));

		server.use(cookieParser(process.env.COOKIE_SECRET));
	};

	launch(){
		this.MONGO.connectDb()
		.then( db => {
			server.listen(port, () => {
				console.log({
					node: `http://localhost:${port}`,
					mongo: db.url,
				});
			});
		})
		.catch( dbErr => console.log('MongoDB Error', dbErr));
	};
}

const nodeapi = new ServerClass();
nodeapi.init();