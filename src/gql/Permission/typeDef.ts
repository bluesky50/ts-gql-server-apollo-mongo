export const typeDefs: string = `
type Permission {
	id: String!
	permissionId: String!
	object: String!
	access: [String!]
}
`;

export const queries: string = `
permissions: [Permission!]!
permission(id: String!): Permission!
`;

export const mutations: string = `
createPermission(object: String!, access: String!): Permission
updatePermission(object: String!, access: String!): Permission
`;