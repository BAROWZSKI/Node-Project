const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route.includes(".js") && route !== "routeManager.js") {
    const routeModule = require("./" + route);

    if (typeof routeModule === "function") {  // second parameter of route.use() must be function.
      let routePath = "/" + route.replace(".js", "");

      if (route === "index.js") {
        routePath = "/";
      }

      router.use(routePath, routeModule);
    }
  }
}

module.exports = router;
