import { createResolver } from 'apollo-resolvers';
import { isAuthenticatedResolver } from '../gql/resolvers';
import { ForbiddenError } from '../lib/errors';
import IResolverContext from '../interfaces/IResolverContext';

export function generateRoleCheckResolver(roleTitle: string) {
	return isAuthenticatedResolver.createResolver((parent: any, args: {}, context: IResolverContext) => {
		// if (context.state.user.role.title !== roleTitle) {
		// 	throw new ForbiddenError();
		// }
		if (!containsRole(context.state.user.roles, roleTitle)) {
			throw new ForbiddenError();
		}
	});
}

function containsRole(roles: Array<any>, title: string): boolean {
	for (let role of roles) {
		if (role.title === title) {
			return true;
		}
	}
	return false;
}