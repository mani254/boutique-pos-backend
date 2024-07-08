const User = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ error: "No token provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		if (!decoded || !decoded.adminId) {
			return res.status(401).json({ error: "Invalid token" });
		}
		const admin = await User.findById(decoded.adminId).populate("store");
		if (!admin) {
			return res.status(404).json({ error: "Admin not found" });
		}
		req.store = admin.store;
		next();
	} catch (err) {
		console.error("Authorization error:", err);
		return res.status(500).json({ error: "Authorization failed" });
	}
};

module.exports = authorization;
