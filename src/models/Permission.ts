import mongoose from 'mongoose';
import IPermission from '../interfaces/IPermission';

export interface IPermissionDocument extends mongoose.Document, IPermission {}

export interface IPermissionModel extends mongoose.Model<IPermissionDocument> {}

const PermissionSchema: mongoose.Schema = new mongoose.Schema({
	object: {
		type: String,
		required: true
	},
	access: {
		type: [{
			type: String
		}],
		default: [],
	}
}, { versionKey: false });

const Functions: any = { getVitualId: null };

Functions.getVitualId = function(): string {
	const permission: IPermissionDocument = this;
	return permission._id.toHexString();
}

PermissionSchema.virtual('permissionId').get(Functions.getVitualId);

PermissionSchema.set('toJSON', { virtuals: true });

const Permission: IPermissionModel = mongoose.model<IPermissionDocument, IPermissionModel>('Permission', PermissionSchema, 'Permissions');

export default Permission;