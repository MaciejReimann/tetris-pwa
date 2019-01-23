const path = require("path");

const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const serveStatic = require("koa-static");

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

// Serve static html file
app.use(serveStatic(path.join(__dirname, "..", "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
