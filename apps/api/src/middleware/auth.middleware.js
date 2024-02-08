const jwt = require("jsonwebtoken");

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) return res.status(500).send("Access denied");

        token = token.split(" ")[1];

        if (token === "null" || !token)
            return res.status(500).send("Unauthorized Token");

        let verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedUser);
        if (!verifiedUser) return res.status(500).send("Unauthorized token");

        req.user = verifiedUser;
        next();
    } catch (err) {
        return res.status(500).send("Invalid Token");
    }
};

export const checkRoleSuperadmin = (req, res, next) => {
    try {
      if (req.user.roleId == 1) {
        next();
      } else {
        return res.status(500).send("Unauthorized");
      }
    } catch (err) {
      return res.status(500).send("Unauthorized");
    }
  };
  
  export const checkRoleAdmin = (req, res, next) => {
    try {
      if (req.user.roleId == 2) {
        next();
      } else {
        return res.status(500).send("Unauthorized");
      }
    } catch (err) {
      return res.status(500).send("Unauthorized");
    }
  };