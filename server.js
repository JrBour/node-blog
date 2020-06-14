require("dotenv").config();
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongo_express = require('mongo-express/lib/middleware')
const mongo_express_config = require('./mongo_express_config')

const { mainRouter } = require('./routers/main.router');

const MONGOclass = require("./services/mongo.class");

const port = process.env.PORT;
const server = express();

class ServerClass {
  constructor() {
    this.MONGO = new MONGOclass();
  }

  init() {
    server.engine("html", ejs.renderFile);
    server.set("view engine", "html");

    server.set("views", __dirname + "/www");
    server.use(express.static(path.join(__dirname, "www/uploads")));
    server.use(bodyParser.json({ limit: "50mb", parameterLimit: 100000 }));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cors())
    server.use(cookieParser(process.env.COOKIE_SECRET));
    this.config();
  }

  config() {
    server.use("/api", mainRouter);
    server.use("/mongo_express", mongo_express(mongo_express_config));
    server.get("/*", (req, res) => res.render("index"));

    this.launch();
  }

  launch() {
    this.MONGO.connectDb()
      .then(db => {
        server.listen(port, () => {
          console.log({
            node: `http://localhost:${port}`,
            db
          });
        });
      })
      .catch(dbErr => console.log("MongoDB Error", dbErr));
  }
}

const nodeApi = new ServerClass();
nodeApi.init();
