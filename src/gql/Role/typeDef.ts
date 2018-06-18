export const typeDefs: string = `
type Role {
	id: String!
	roleId: String!
	title: String!
	permissions: [String!]
}
`;

export const queries: string = `
roles: [Role!]!
role: Role!
`;

export const mutations: string = `
createRole(title: String!): Role
addPermissionToRole(permissionId: String!, title: String!): Role
`;