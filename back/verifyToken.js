function verifyToken(req, res, next) {
  // GET auth header value
  const bearerHeader = req.headers["authorization"];
  // check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // get token
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;
    // next middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
