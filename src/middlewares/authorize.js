const jwt = require("express-jwt");
const db = require("helpers/db");

module.exports = authorize;

function authorize(userTypes = []) {
  // userTypes param can be a single user_type string (e.g. userTypes.user or 'ser')
  // or an array of userTypes (e.g. [userTypes.admin, userTypes.user] or ['admin', 'user'])
  if (typeof userTypes === "string") {
    userTypes = [userTypes];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.secret, algorithms: ["HS256"] }),

    // authorize based on user type
    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.id);

      if (!user || (userTypes.length && !userTypes.includes(user.user_type))) {
        // user no longer exists or user type not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      req.user.user_type = user.user_type;
      const refreshTokens = await user.getRefreshTokens();
      req.user.ownsToken = (token) =>
        !!refreshTokens.find((x) => x.token === token);
      next();
    },
  ];
}
