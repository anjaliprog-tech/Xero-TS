import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const authenticateUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		if(!req.header('Authorization')) {
			return res.status(400).send('Auth Params Missing');
		}
		const token = req.header('Authorization')?.split('Bearer ')[1];
		if (!token) {
			return res.status(401).send('Unauthorized');
		}

    // not valid then refreah token api will be called
		// try {
		// 	const decodedToken = await jwt.verify(token, process.env.JWT_SECRET as string);
			
		// 	if (decodedToken) {
		// 		(req as any).user = decodedToken;
		// 		return next();
		// 	}
		// } catch (err) {
		// 	console.log(err)
		// 	return res.status(401).send('Session Expired');
		// }
	} catch (err) {
		console.log(err);
		return err;
	}
}

export default authenticateUser