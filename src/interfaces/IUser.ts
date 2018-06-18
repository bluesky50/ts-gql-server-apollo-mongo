interface IUser {
	userId: string;
	username: string;
	email: string;
	authToken: string;
	refreshToken: string;
	roles: Array<string>;
	groups: Array<string>;
	id?: any;
}

export default IUser;