import _ from 'lodash';

import IDefinition from '../interfaces/IDefinition';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

import * as authTypeDef from './Auth/typeDef';
import authResolvers from './Auth/resolvers';
import * as commentTypeDef from './Comment/typeDef';
import commentResolvers from './Comment/resolvers';
import * as permissionTypeDef from './Permission/typeDef';
import permissionResolvers from './Permission/resolvers';
import * as postTypeDef from './Post/typeDef';
import postResolvers from './Post/resolvers';
import * as roleTypeDef from './Role/typeDef';
import roleResolvers from './Role/resolvers';
import * as userTypeDef from './User/typeDef';
import userResolvers from './User/resolvers';

const types: Array<string> = [];
const queries: Array<string> = [];
const mutations: Array<string> = [];
const subscriptions: Array<string> = [];

const definitions: Array<IDefinition> = [ authTypeDef, commentTypeDef, permissionTypeDef, postTypeDef, roleTypeDef, userTypeDef ];

definitions.forEach((d: IDefinition): void => {
	if (d.typeDefs) {
		types.push(d.typeDefs);
	}

	if (d.queries) {
		queries.push(d.queries);
	}

	if (d.mutations) {
		mutations.push(d.mutations);
	}

	if (d.subscriptions) {
		subscriptions.push(d.subscriptions);
	}
});

const TypeDefs: string = `
${types.join('\n')}
`;

const QueryDef: string = `
type Query {
${queries.join('\n')}
}
`;

const MutationDef: string = `
type Mutation {
${mutations.join('\n')}
}
`;

const SubscriptionDef: string = `
type Subscription {
${subscriptions.join('\n')}
}
`;

const gqlDefs: Array<string> = [ QueryDef, MutationDef ];
const typeDefs: Array<string> = types;
const mergedResolvers: IResolvers<any, any> = _.merge(authResolvers, commentResolvers, permissionResolvers, postResolvers, roleResolvers, userResolvers);

const gqlSchema = makeExecutableSchema({
	typeDefs: [ ...gqlDefs, ...typeDefs ],
	resolvers: mergedResolvers
});

export default gqlSchema;