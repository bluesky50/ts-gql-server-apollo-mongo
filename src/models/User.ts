import _ from 'lodash';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

import { createAuthToken, createRefreshToken } from '../utils/tokenHelpers';

export interface IUserDocument extends mongoose.Document, IUser {
	generateAuthToken(): IUserDocument;
	generateRefreshToken(): IUserDocument;
	generateTokens(): IUserDocument;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
	findByAuthToken(userId: string, authToken: String): IUserDocument;
	findByRefreshToken(userId: string, refreshToken: String): IUserDocument;
	findByUsername(username: string): IUserDocument; 
};

const UserSchema: mongoose.Schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	authToken: {
		type: String,
		required: false,
	},
	refreshToken: {
		type: String,
		required: false,
	},
	roles: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role'
		}],
		default: []
	},
	groups: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			// ref: 'Group'
		}],
		default: []
	}
}, { versionKey: false });

const Functions: any = { getVitualId: null };

Functions.getVitualId = function(): string {
	const user: IUserDocument = this;
	return user._id.toHexString();
}

UserSchema.virtual('userId').get(Functions.getVitualId);

UserSchema.set('toJSON', { virtuals: true });

UserSchema.statics.findByAuthToken = function(userId: string, authToken: string) {
	const User = this;
	return User.findOne({
		_id: userId,
		authToken: authToken
	});
}

UserSchema.statics.findByUsername = function(username: string) {
	const User = this;
	return User.findOne({ username });
}

UserSchema.methods.generateAuthToken = function() {
	const user = this;
	const token = createAuthToken(user);
	user.authToken = token;
	return user.save();
}

UserSchema.methods.generateRefreshToken = function() {
	const user = this;
	const token = createRefreshToken(user);
	user.refreshToken = token;
	return user.save();
}

UserSchema.methods.generateTokens = async function() {
	const user = this;
	const authToken = await createAuthToken(user);
	const refreshToken = await createRefreshToken(user);
	user.authToken = authToken;
	user.refreshToken = refreshToken;
	return user.save();
}

UserSchema.pre('save', function(next) {
	const user: any = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

UserSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	return _.pick(userObject, ['username', 'email', 'authToken', 'roles', 'groups', 'refreshToken', '_id']);
}

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema, 'Users');

export default User;