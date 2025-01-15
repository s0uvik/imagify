import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      message: "Missing token",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        message: "Invalid token, try again",
      });
    }
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
