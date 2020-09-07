const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {

	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

	if(token) {

		try {
			const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
			req.user = data;
			return next();
		} catch(error) {
			return res.status(403).json({ msg: 'Invalid Token' })
		}

	}

	res.status(403).json({ msg: 'Unauthorized Action' })
}
	
module.exports = authorize;