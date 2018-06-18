import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { UnknownError, ForbiddenError, AuthenticationRequiredError, AlreadyAuthenticatedError } from '../lib/errors';
import { generateRoleCheckResolver } from '../utils/resolverHelpers';
import IResolverContext from '../interfaces/IResolverContext';

export const baseResolver: any = createResolver(
	null,
	(parent: any, args: {}, context: IResolverContext, error: any) => { 
		isInstance(error) ? error : new UnknownError();
	}
);

export const isAuthenticatedResolver  = baseResolver.createResolver((parent: any, args: {}, context: IResolverContext) => {
	if (context.state.user === null) {
		throw new AuthenticationRequiredError();
	}
});

export const isNotAuthenticatedResolver = baseResolver.createResolver((parent: any, args: {}, context: IResolverContext) => {
	if (context.state.user) throw new AlreadyAuthenticatedError();
});

// export const isAdminResolver = isAuthenticatedResolver.createResolver((parent, args, context) => {
// 	if (context.state.user.role.title !== 'admin') {
// 		throw new ForbiddenError();
// 	}
// });

export const isAdminResolver = generateRoleCheckResolver('admin');