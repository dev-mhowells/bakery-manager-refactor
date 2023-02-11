// const JWT = require("jsonwebtoken");
// const options = { expiresIn: "6h" };
// const secret = process.env.JWT_SECRET;

// class TokenGenerator {
//   static jsonwebtoken(user_id) {
//     return JWT.sign(
//       { user_id: user_id, iat: Math.floor(Date.now() / 1000) },
//       secret,
//       options
//     );
//   }
// }

// module.exports = TokenGenerator;