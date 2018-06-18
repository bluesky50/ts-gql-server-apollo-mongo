interface IRole {
	roleId: string;
	title: string;
	permissions: Array<string>;
	id?: any;
}

export default IRole;