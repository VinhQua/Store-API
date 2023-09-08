const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err instanceof CustomAPIError);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(600).json({ msg: err.message });
  return res
    .status(500)
    .json({ msg: "Something went wrong, try again later!" });
};

module.exports = errorHandlerMiddleware;
