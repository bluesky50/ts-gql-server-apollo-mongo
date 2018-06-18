import IComment from '../../interfaces/IComment';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/IResolverMap';
import IResolverContext from '../../interfaces/IResolverContext';

const commentsResolver = async (parent: any, args: { postId: string }, context: IResolverContext): Promise<IComment> => {
	return await context.models.Comment.find({
		post: args.postId
	});
};

const commentResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IComment> => {
	return await context.models.Comment.findById(args.id);
};

const createCommentResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: { postId: string, content: string }, context: IResolverContext): Promise<IComment> => {
		const newComment = await new context.models.Comment({
			post: args.postId,
			content: args.content,
			user: context.state.user.id
		}).save();

		if (newComment) {
			return newComment;
		} else {
			return await Promise.reject();
		}
	}
);

const resolvers: IResolverMap = {
	Query: {
		comments: commentsResolver,
		comment: commentResolver
	},
	Mutation: {
		createComment: createCommentResolver
	}
}

export default resolvers;