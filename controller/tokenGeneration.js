import jwt from "jsonwebtoken";

 // any secret for local use

const mockUser = {
  id: "12345",
  email: "tejas@example.com",
  role: "admin"
};





export const generateToken = (user) => {
    // Generate token
    const token = jwt.sign(mockUser, secret, { expiresIn: "1h" });

    console.log("Mock JWT Token:\n", token);
    return token;
};


export const verifyToken = (req, res, next) => {

  const secret = req.body.username;
  console.log("Secret ",secret)
  const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];
  console.log("Secret ",secret)

  try {
    
    const decoded = jwt.verify(token, secret);

    if (decoded.email !== 'tejas@example.com') {
      return res.status(403).json({ message: "Invalid client" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
