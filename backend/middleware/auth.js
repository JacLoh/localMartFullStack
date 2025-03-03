const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(" Checking authorization header:", authHeader); 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.error(" No token or incorrect format");
        return res.status(401).json({ message: " No token provided or incorrect format" });
    }

    const token = authHeader.split(" ")[1]; //  Extract token
    console.log("🔑 Extracted Token:", token); 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded:", decoded); 
        req.user = decoded; // Store user info in request
        next();
    } catch (error) {
        console.error(" Invalid Token:", error.message);
        return res.status(401).json({ message: " Invalid token" });
    }
};

module.exports = authMiddleware;
