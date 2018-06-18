interface IServer {
	app;
	ormAdapter;
	httpServer;
	run(): void;
	close(): void;
}

export default IServer;