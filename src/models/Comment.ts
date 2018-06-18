import mongoose from 'mongoose';
import IComment from '../interfaces/IComment';

export interface ICommentDocument extends mongoose.Document, IComment {}

export interface ICommentModel extends mongoose.Model<ICommentDocument> {}

const CommentSchema: mongoose.Schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	content: {
		type: String,
		required: true
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Post'
	}
}, { versionKey: false });

const Functions: any = { getVitualId: null };

Functions.getVitualId = function(): string {
	const comment: ICommentDocument = this;
	return comment._id.toHexString();
}

CommentSchema.virtual('commentId').get(Functions.getVitualId);

CommentSchema.set('toJSON', { virtuals: true });

const Comment: ICommentModel = mongoose.model<ICommentDocument, ICommentModel>('Comment', CommentSchema, 'Comments');

export default Comment;