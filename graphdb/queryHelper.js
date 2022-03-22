const { GetQueryPayload, UpdateQueryPayload } = require("graphdb").query;
const { RDFMimeType,QueryContentType } = require("graphdb").http;
const { QueryType } = require("graphdb").query;

class QueryHelper {
  constructor(queryType, queryPayload) {
    if (queryType == "Update") {
        this.queryPayload = new UpdateQueryPayload()
        .setQuery(queryPayload)
        .setContentType(QueryContentType.X_WWW_FORM_URLENCODED)
        
    } else 
    {
      this.queryPayload = new GetQueryPayload()
        .setQuery(queryPayload)
        .setQueryType(queryType);

      switch (queryType) {
        case QueryType.DESCRIBE:
          this.queryPayload.setResponseType(RDFMimeType.RDF_XML);
          break;
        case QueryType.CONSTRUCT:
          this.queryPayload.setResponseType(RDFMimeType.RDF_XML);
          break;
        default:
          this.queryPayload.setResponseType(RDFMimeType.SPARQL_RESULTS_XML);
      }
    }
  }
  getPayload() {
    return this.queryPayload;
  }
}

module.exports = QueryHelper;
