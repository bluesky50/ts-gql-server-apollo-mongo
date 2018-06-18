/**
 * Server configuration variables.
 */
const serverConfig = {
	appName: 'gqlMax',
	port: 5000,
	host: 'localhost',
	env: 'dev',
	dbUri: 'mongodb://localhost:32768/',
	gqlEndpoint: '/graphql',
	gqlSubscriptionsEndpoint: '/subscriptions'
}

export default serverConfig;