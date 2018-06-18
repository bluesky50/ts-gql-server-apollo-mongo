import IPermission from '../../interfaces/IPermission';
import { isAdminResolver } from '../resolvers';
import IResolverMap from '../../interfaces/IResolverMap';
import IResolverContext from '../../interfaces/IResolverContext';

const permissionsResolver = isAdminResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<IPermission> => {
		return await context.models.Permission.find();
	}
);

const permissionResolver = isAdminResolver.createResolver(
	async (parent: any, args: { object: string }, context: IResolverContext): Promise<IPermission> => {
		return await context.models.Permission.findOne({ object: args.object });
	}
);

const createPermissionResolver = isAdminResolver.createResolver(
	async (parent: any, args: { object: string, access: string }, context: IResolverContext): Promise<IPermission> => {

		const newPermission = await new context.models.Permission({
			object: args.object,
			access: checkPermissionAccessString(args.access)
		}).save();

		if (newPermission) {
			return newPermission;
		} else {
			return await Promise.reject();
		}
	}
);

const updatePermissionResolver = isAdminResolver.createResolver(
	async (parent: any, args: { object: string, access: string }, context: IResolverContext): Promise<IPermission> => {
		const permission = context.models.Permission.findOne({ object: args.object });
		
		if (permission) {
			const updatedAccess = checkPermissionAccessString(args.access);
			permission.access = updatedAccess;
			return await permission.save();
		} else {
			return await Promise.reject();
		}
	}
);

const resolvers: IResolverMap = {
	Query: {
		permissions: permissionsResolver,
		permission: permissionResolver
	},
	Mutation: {
		createPermission: createPermissionResolver,
		updatePermission: updatePermissionResolver
	}
}

function checkPermissionAccessString(input: string): Array<string> {
	const results: Array<string> = [];
	const types: Array<string> = ['c', 'r', 'u', 'd'];
	const inputArr = input.split(' ');

	inputArr.forEach((i: string) => {
		if (types.includes(i)) {
			results.push(i);
		}
	});

	return results;
}

export default resolvers;