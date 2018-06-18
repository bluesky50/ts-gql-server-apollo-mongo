export const typeDefs: string = `
type User {
	id: String!
	userId: String!
	username: String!
	email: String!
	roles: [String!]
	authToken: String!
	refreshToken: String!
}
`;

export const queries: string = `
users: [User!]
user(username: String!): User
`;

export const mutations: string = `
addRoleToUser(username: String!, roleId: String!): User
removeRoleFromUser(username: String!, roleId: String!): User
`;