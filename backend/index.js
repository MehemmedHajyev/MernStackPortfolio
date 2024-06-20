const http = require("http");
const dotenv = require("dotenv");
const routeHandler = require("./routes/routes");
const { generateResponse } = require("./utils/common");
const ResponseConfig = require("./utils/responseConfig");
const { CONTENT_TYPES } = require("./utils/constant");
const { ErrorResult } = require("./utils/result");
const useCors = require("./middlewares/cors");

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  useCors(req, res, () => {
    handleDynamicRoutes(req, res);
  });
});

const handleDynamicRoutes = (req, res) => {
  if (!routeHandler(req, res)) {
    generateResponse(
      new ResponseConfig(
        404,
        req,
        res,
        CONTENT_TYPES[".json"],
        JSON.stringify(new ErrorResult("Not Found"))
      )
    );
  }
};

server.listen(PORT, () => {
  console.log(PORT);
});