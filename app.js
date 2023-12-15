import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import mustacheExpress from "mustache-express";
import "body-parser";

// routers
import mainRouter from "./routers/mainRouter.js";
import teamRouter from "./routers/teamRouter.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// set dirs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "/views"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));


// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", mainRouter);
app.use("/teams", teamRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
