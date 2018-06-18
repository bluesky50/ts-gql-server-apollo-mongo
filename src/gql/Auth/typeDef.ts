export const typeDefs: string = `
type LoginResponse {
	success: Boolean!
	authToken: String
	refreshToken: String
}

type RegisterResponse {
	success: Boolean!
}
`;

export const mutations: string = `
login(username: String!, password: String!): LoginResponse!
register(username: String!, email: String!, password: String!): RegisterResponse!
`;