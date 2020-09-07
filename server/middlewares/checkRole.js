exports.isAdmin = (req,res,next) => {
 if(req.user.userType === 'admin' || req.user.userType === 'superadmin')
	 	return next()

	res.status(401).json({ msg: "Unauthorized Action" })
}

exports.isSuperAdmin = (req,res,next) => {

 if(req.user.userType === 'superadmin')
 	return next()

 res.status(401).json({ msg: "Unauthorized Action" })


 res.status(401).json({ msg: "Unauthorized Action" })

}
