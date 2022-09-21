module.exports = {
	enviornment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8000,
	dbFile: process.env.DB_File,
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN
	}
};
