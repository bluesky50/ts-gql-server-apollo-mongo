import mongoose from 'mongoose';
import IPost from '..//interfaces/IPost';

export interface IPostDocument extends mongoose.Document, IPost {}

export interface IPostModel extends mongoose.Model<IPostDocument> {}

const PostSchema: mongoose.Schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
}, { versionKey: false });

const Functions: any = { getVitualId: null };

Functions.getVitualId = function(): string {
	const permission: IPostDocument = this;
	return permission._id.toHexString();
}

PostSchema.virtual('postId').get(Functions.getVitualId);

PostSchema.set('toJSON', { virtuals: true });

const Post: IPostModel = mongoose.model<IPostDocument, IPostModel>('Post', PostSchema, 'Posts');

export default Post;