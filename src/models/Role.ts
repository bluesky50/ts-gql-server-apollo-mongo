import mongoose from 'mongoose';
import IRole from '../interfaces/IRole';

export interface IRoleDocument extends mongoose.Document, IRole {}

export interface IRoleModel extends mongoose.Model<IRoleDocument> {}

const RoleSchema: mongoose.Schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	permissions: {
		type: [{
			type: mongoose.Schema.Types.ObjectId
		}],
		default: []
	}
}, { versionKey: false });

const Functions: any = { getVitualId: null };

Functions.getVitualId = function(): string {
	const permission: IRoleDocument = this;
	return permission._id.toHexString();
}

RoleSchema.virtual('roleId').get(Functions.getVitualId);

RoleSchema.set('toJSON', { virtuals: true });

const Role: IRoleModel = mongoose.model<IRoleDocument, IRoleModel>('Role', RoleSchema, 'Roles');

export default Role;