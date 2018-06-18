import _ from 'lodash';
import jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
// import bcrypt from 'bcrypt';
import { AUTH_TOKEN_SECRET, REFRESH_SECRET } from '../configs/secrets';

export async function createAuthToken(user: IUser): Promise<string> {
	const secret = AUTH_TOKEN_SECRET; // TODO: Change this later;
	const authToken = await jwt.sign(
		{ user: _.pick(user, ['id', 'roles']) },
		secret,
		{ expiresIn: '1h' }
	);
	return authToken;
}

export async function createRefreshToken(user: IUser) {
	const secret = REFRESH_SECRET; // TODO: Change this later.
	const refreshToken = await jwt.sign(
		{ user: _.pick(user, ['id', 'roles']) },
		secret,
		{ expiresIn: '7d' }
	);
	return refreshToken;
}

export const createTokens = async (user: string, tokenSecret: string, refreshSecret: string) => {
	// const createToken = jwt.sign(
	// 	{
	// 		user: _.pick(user, ['_id', 'roles'])
	// 	},
	// 	tokenSecret,
	// 	{
	// 		expiresIn: '1h'
	// 	}
	// );

	// const createRefreshToken = jwt.sign(
	// 	{
	// 		user: _.pick(user, '_id')
	// 	},
	// 	refreshSecret,
	// 	{
	// 		expiresIn: '7d'
	// 	}
	// );

	// return await Promise.all([createToken, createRefreshToken]);
}

export const refreshToken = (refreshToken: string, refreshSecret: string) => {
	// let userId = -1;
	// try {
	// 	const { user: { id } } = jwt.verify(refreshToken, refreshSecret);
	// 	userId = id;
	// } catch (e) {
	// 	return {};
	// }

	// const user = await models.User.findOne()
	// const [newToken, newRefreshToken] = await createTokens();
	// return {
	// 	token: newToken,
	// 	refreshToken: newRefreshToken
	// }
}

export function isExpired(decodedToken: any): boolean {
	const currentTime = Date.now() / 1000;
	if (decodedToken.exp && decodedToken.exp < currentTime) {
		return true
	}
	return false;
}

export function generateSecret() {

}