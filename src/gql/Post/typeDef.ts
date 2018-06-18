export const typeDefs: string = `
type Post {
	id: String!
	postId: String!
	user: String!
	title: String!
	content: String!
}
`;

export const queries: string = `
posts: [Post!]!
post: Post!
`;

export const mutations: string = `
createPost(title: String!, content: String!): Post
`;