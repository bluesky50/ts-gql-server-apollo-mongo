interface IPermission {
	permissionId: string;
	object: string;
	access: Array<string>;
	id?: any;
}

export default IPermission;