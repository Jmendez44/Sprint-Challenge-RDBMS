const express = require("express");
const server = express();
const projects = require("./data/routes/projectRoute");
const actions = require("./data/routes/actionRoute");
const helmet = require("helmet");
const port = 4000;

server.use(helmet());
server.use("/api/actions", actions);
server.use("/api/projects", projects);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
