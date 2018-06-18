import IUser from '../../interfaces/IUser';
import { isAuthenticatedResolver, isAdminResolver } from "../resolvers";
import IResolverMap from '../../interfaces/IResolverMap';
import IResolverContext from '../../interfaces/IResolverContext';

const usersResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: {}, context: IResolverContext): Promise<IUser> => {
		return await context.models.User.find();
	}
);

const userResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: { username: string }, context: IResolverContext): Promise<IUser> => {
		return await context.models.User.findOne({ username: args.username });
	}
);

const addRoleToUserResolver = isAdminResolver.createResolver(
	async (parent: any, args: { username: string, roleId: string }, context: IResolverContext): Promise<IUser> => {
		const user = await context.models.User.findOne({ username: args.username });
		
		if (user) {
			const roles = user.roles.map((r: any) => {
				return r.toString();
			});

			const role = context.models.Role.findById(args.roleId);

			if (role) {	
				if (!roles.includes(args.roleId)) {
					user.roles.push(args.roleId);
					return await user.save();
				} else {
					return user;
				}
			}
		}
	
		return await Promise.reject();
	}
);

const removeRoleFromUserResolver = isAdminResolver.createResolver(
	async (parent: any, args: { username: string, roleId: string }, context: IResolverContext): Promise<IUser> => {
		const user = await context.models.User.findOne({ username: args.username });
		
		if (user) {
			const roles = user.roles.map((r: any) => {
				return r.toString();
			});

			if (roles.includes(args.roleId)) {
				user.roles.pull(args.roleId);
				return await user.save();
			} else {
				return user;
			}
		}

		return await Promise.reject();
	}
);

const resolvers: IResolverMap = {
	Query: {
		users: usersResolver,
		user: userResolver
	},
	Mutation: {
		addRoleToUser: addRoleToUserResolver,
		removeRoleFromUser: removeRoleFromUserResolver
	}
}

export default resolvers; 