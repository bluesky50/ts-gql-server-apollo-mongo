import mongoose from 'mongoose';

import Comment from '../models/Comment';
import Permission from '../models/Permission';
import Post from '../models/Post';
import Role from '../models/Role';
import User from '../models/User';

import debug from '../lib/debugger';
import IOrmAdapter from '../interfaces/IOrmAdapter';

export class OrmAdapter implements IOrmAdapter {
	public dbUrl: string;
	private models: { [key: string]: any };

	constructor(dbUrl = '') {
		this.dbUrl = dbUrl;
		this.models = {
			Comment,
			Permission,
			Post,
			Role,
			User
		}
	}

	public connect() {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.dbUrl);
		mongoose.connection.once('open', () => {
			debug('Connected to database.');
		});
	}

	public disconnect() {
		mongoose.connection.close();
	}

	public getModels() {
		return this.models;
	}

	public getModel(name: string) {
		return this.models[name];
	}
}

export default OrmAdapter;