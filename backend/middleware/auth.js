const jwt = require('jsonwebtoken');

exports.userAuth = async (req, res, next) => {
    try {
        const cookieToken = req.cookies.token ?? "";
        const headerToken = req.headers.authorization?.split(" ")[1] ?? "";
        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                status: "failed",
            });
        } else {
            // Verify the token
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(tokenDecode);

            if (tokenDecode.id) {
                
                req.user = {
                    id: tokenDecode.id,
                    email: tokenDecode.email,
                    username: tokenDecode.username,
                };
                console.log("auth:", req.user);
                return next(); 
            } else {
                return res.status(401).json({
                    message: "Unauthorized access, invalid token",
                    error: true,
                    status: "failed",
                });
            }
        }
    } catch (err) {
        return res.status(401).json({
            message: "Authentication failed",
            error: true,
            status: "failed",
        });
    }
};
