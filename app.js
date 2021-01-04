const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("custom-env").env("dev");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;

routes = require('./routes/index');
app.use("/api", routes);

async function start() {
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log("----- Server has been started -----");
        });
    } catch (e) {
        console.log(e);
    }
}

start();