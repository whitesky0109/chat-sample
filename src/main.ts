import server from './server';

const serv = new server(process.env.PORT);

serv.runServ();
