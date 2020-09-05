exports.isAdmin = (req,res,next) => {

	 if(req.user.userType === 'admin' || req.userType === 'superadmin')
	 	return next()

	 res.status(401).json({ msg: "Unauthorized Action" })
	next()
}

exports.isSuperAdmin = (req,res,next) => {

	 if(req.userType === 'superadmin')
	 	return next()

	 res.status(401).json({ msg: "Unauthorized Action" })


	 res.status(401).json({ msg: "Unauthorized Action" })
	next()
}
