// Create a new connection with the graphDB host running locally (default port 7200)
// and with the repository named Mafia. Exports server and repository connections

const {ServerClient, ServerClientConfig} = require('graphdb').server;
const {RepositoryClientConfig, RDFRepositoryClient} = require('graphdb').repository;
const {RDFMimeType} = require('graphdb').http;
const {SparqlXmlResultParser,RDFXmlParser}=require('graphdb').parser

const serverConfig = new ServerClientConfig('http://localhost:7200/')
    .setTimeout(5000)
    .setHeaders({
        'Accept': RDFMimeType.SPARQL_RESULTS_JSON
    })
    .setKeepAlive(true);

const server = new ServerClient(serverConfig);
const endpoint = 'http://localhost:7200B';
const readTimeout = 30000;
const writeTimeout = 30000;
const config = new RepositoryClientConfig(endpoint)
    .setEndpoints(['http://localhost:7200/repositories/Mafia'])
    .setHeaders({
      'Accept': RDFMimeType.TURTLE
    })
    .setReadTimeout(readTimeout)
    .setWriteTimeout(writeTimeout);

const repository = new RDFRepositoryClient(config);
repository.registerParser(new SparqlXmlResultParser());
repository.registerParser(new RDFXmlParser())


module.exports={
    server:server,
    repository:repository
}