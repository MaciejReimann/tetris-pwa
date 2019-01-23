const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const serveStatic = require("koa-static");

const app = new Koa();

app.use(cors());
app.use(
  compress({
    threshold: 4096
  })
);
app.use(bodyParser());

const router = new Router();

const swSource = fs.readFileSync(
  path.join(__dirname, "..", "src", "service-worker.js")
);
router.get("/service-worker.js", async ctx => {
  ctx.response.type = "application/javascript";
  ctx.response.body = swSource;
});

app.use(router.routes());
app.use(router.allowedMethods());

// Serve static html file
app.use(serveStatic(path.join(__dirname, "..", "public")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
