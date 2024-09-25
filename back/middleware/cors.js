function AllowAllOrigins(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(`Access-Control-Allow-Methods`, `GET,PATCH,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `*`);
  next();
}

module.exports = AllowAllOrigins