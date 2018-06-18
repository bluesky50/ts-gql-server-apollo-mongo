export const typeDefs: string = `
type Comment {
	id: String!
	commentId: String!
	content: String!
	user: String!
	post: String!
}
`;

export const queries: string = `
comments: [Comment!]!
comment(id: String!): Comment!
`;

export const mutations: string = `
createComment(postId: String!, content: String!): Comment
`;