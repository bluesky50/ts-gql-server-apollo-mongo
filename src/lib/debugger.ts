import serverConfig from '../configs/serverConfig';

const debug = require('debug')(`server:${serverConfig.appName}`);

export default debug;