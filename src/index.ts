import bodyParser from 'body-parser';
import { Server } from './classes/server';
import { SERVER_PORT } from './globals/environments';
import { router } from './routes/router';
import cors from 'cors';

const server = Server.instance;

// RUN SERVER
server.start(() => console.log(`Servidor corriendo en el purto ${ SERVER_PORT }`));

// BODY PARSER
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({origin: 'http://localhost:4200', credentials:true}));

// ROUTER
server.app.use('/', router);

