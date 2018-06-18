import IPost from '../../interfaces/IPost';
import { isAuthenticatedResolver } from '../resolvers';
import IResolverMap from '../../interfaces/IResolverMap';
import IResolverContext from '../../interfaces/IResolverContext';

const postsResolver = async (parent: any, args: {}, context: IResolverContext): Promise<IPost> => {
	return await context.models.Post.find();
};

const postResolver = async (parent: any, args: { id: string }, context: IResolverContext): Promise<IPost> => {
	return await context.models.Post.findById(args.id);
};

const createPostResolver = isAuthenticatedResolver.createResolver(
	async (parent: any, args: { title: string, content: string }, context: IResolverContext): Promise<IPost> => {
		const newPost = await new context.models.Post({
			title: args.title,
			content: args.content,
			user: context.state.user.id
		}).save();

		if (newPost) {
			return newPost;
		} else {
			return await Promise.reject();
		}
	}
)

const resolvers: IResolverMap = {
	Query: {
		posts: postsResolver,
		post: postResolver
	},
	Mutation: {
		createPost: createPostResolver
	}
}

export default resolvers;