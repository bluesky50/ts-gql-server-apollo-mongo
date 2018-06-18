import Koa from 'koa';
import { createServer } from 'http';

import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import schema from '../gql/schema';
import { OrmAdapter } from './OrmAdapter';
import { applyMiddleware, addGraphQLRoute } from '../utils/serverInitHelpers';
import { normalizePort, onError, onListening } from '../utils/serverHelpers';

import debug from '../lib/debugger';
import IServer from '../interfaces/IServer';
import IOrmAdapter from '../interfaces/IOrmAdapter';

export class Server implements IServer {
	public app: Koa;
	public ormAdapter: IOrmAdapter;
	public httpServer: any;
	private serverConfig: any;

	constructor(config: any, app: any, ormAdapter: any) {
		this.app = app;
		this.ormAdapter = ormAdapter;
		this.httpServer = null;
		this.serverConfig = config;
	}

	public run() {
		this._pre();
		this._start();
		this._post();
	}

	public close() {
		debug('Shutdown sequence...');
		this.ormAdapter.disconnect();
		this.httpServer.close();
		// process.exit();
	}

	/**
	 * Server flow functions.
	 */
	private _pre() {
		debug('Pre sequence...');
		this._initializeDataSouce();
		this._initializeApp();
		this._initializeRoutes();
	}

	private _start() {
		debug('Start sequence...');
		// Create http server and configure gql subscriptions.
		const wss = createServer(this.app.callback());
		this.httpServer = wss;
	
		const port = normalizePort(this.serverConfig.port);

		this.httpServer.on('error', onError(port));
		this.httpServer.on('listening', onListening(this.httpServer));

		this.httpServer.listen(port, (ctx: Koa.Context) => {
			new SubscriptionServer({
				execute,
				subscribe,
				schema
			}, {
				server: this.httpServer,
				path: this.serverConfig.gqlSubscriptionsEndpoint
			});
		});
	}

	private _post() {
		debug('Start sequence...');
	}

	/**
	 * Server _pre functions
	 */
	private _initializeDataSouce() {
		if (this.ormAdapter === undefined || this.ormAdapter === null) {
			this.ormAdapter = new OrmAdapter(this.serverConfig.dbUri + this.serverConfig.appName);
			this.ormAdapter.connect();
		}
	}

	private _initializeApp() {
		if (this.app === undefined || this.app === null) {
			this.app = new Koa();
		}

		applyMiddleware(this.app);
	}

	private _initializeRoutes() {
		// Create graphql endpoint.
		addGraphQLRoute(this.app, this.serverConfig.gqlEndpoint, schema, this.ormAdapter.getModels());
	}
}

export default Server;