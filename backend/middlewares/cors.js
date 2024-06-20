function useCors(req, res, next) {
  if (req.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,HEAD,POST,PUT",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    res.writeHead(204, headers);
    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

    next();
  }
}

module.exports = useCors;