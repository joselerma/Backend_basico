require("dotenv").config();
const jwt = require("jsonwebtoken");

const grabarToken = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JSONWEBTOKEN_SIGN,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  grabarToken,
};
