import Koa from 'koa';
import koaRouter from 'koa-router';
import { graphqlKoa } from 'apollo-server-koa';
import middleware from '../lib/middleware';

export function applyMiddleware(app: Koa): void {
	app.use(middleware.cors());
	app.use(middleware.logger());
	app.use(middleware.helmet());
	app.use(middleware.koaBody());
	// app.use(middleware.authTokenMiddleware());
}

export function addGraphQLRoute(app: Koa, gqlEndpoint: string, schema: any, models: { [key: string]: any }): void {
	const gqlRouter = new koaRouter();
	gqlRouter.post(gqlEndpoint, middleware.authTokenMiddleware(), graphqlKoa((ctx: Koa.Context) => ({ schema, context: { state: ctx.state, models: models } })));
	gqlRouter.get(gqlEndpoint, graphqlKoa({ schema }));
	app.use(gqlRouter.routes());
	app.use(gqlRouter.allowedMethods());
}