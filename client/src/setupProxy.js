const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(proxy("/api/dbwords", { target: "http://localhost:5000/" }));
  app.use(proxy("/graphql", { target: "http://localhost:5000/graphql" }));
  app.use(proxy("/api/words", { target: "http://localhost:5000/" }));
};
