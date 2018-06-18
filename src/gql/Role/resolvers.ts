import IRole from '../../interfaces/IRole';
import { isAdminResolver } from '../resolvers';
import IResolverMap from '../../interfaces/IResolverMap';
import IResolverContext from '../../interfaces/IResolverContext';

const rolesResolver = isAdminResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<IRole> => {
		return await context.models.Role.find();
	}
);

const roleResolver = isAdminResolver.createResolver(
	async (parent: any, args: { title: string }, context: IResolverContext): Promise<IRole> => {
		return await context.models.Role.findOne({ title: args.title });
	}
);

const createRoleResolver = isAdminResolver.createResolver(
	async (parent: any, args: { title: string }, context: IResolverContext): Promise<IRole> => {
		const newRole = await new context.models.Role({
			title: args.title
		}).save();

		if (newRole) {
			return newRole;
		} else {
			return await Promise.reject();
		}
	}
);

const addPermissionToRoleResolver = isAdminResolver.createResolver(
	async (parent: any, args: { title: string, permissionId: string }, context: IResolverContext): Promise<IRole> => {
		const role = await context.models.Role.findOne({ title: args.title });
		
		if (role) {
			const permission = await context.models.Permission.findById(args.permissionId);
			
			if (permission) {
				const permissions = role.permissions.map((p: any) => {
					return p.toString();
				});
				
				if (!permissions.includes(permission.id)) {
					role.permissions.push(permission.id);
					return await role.save();
				} else {
					return role;
				}
			}
		} 

		return await Promise.reject();
	}
);

const resolvers: IResolverMap = {
	Query: {
		roles: rolesResolver,
		role: roleResolver
	},
	Mutation: {
		createRole: createRoleResolver,
		addPermissionToRole: addPermissionToRoleResolver
	}
}

export default resolvers;