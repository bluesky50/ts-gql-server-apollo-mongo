import { Server } from './classes/Server';
import serverConfig from './configs/serverConfig';

const server = new Server(serverConfig, null, null);

server.run();