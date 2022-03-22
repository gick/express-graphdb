const QueryHelper=require('../graphdb/queryHelper')
const {QueryType}=require('graphdb').query
const {repository}=require('../graphdb/initConnection')


// SELECT, DESCRIBE and CONSTRUCT Query execution is based on NodeJS stream
// execute a query and printout the stream of responses 
function executeStreamedQuery(repo,queryPayload){
    repo.query(queryPayload).then((stream)=>{
        stream.on('data',(bindings)=>{
            console.log(bindings)
        })
        stream.on('end',()=>
        {
            console.log('No more results')
         })
    })
}


// INSERT Query do not provide data bindings
function executeInsertQuery(repo,queryPayload){
    repo.query(queryPayload).then(()=>{
        console.log("Tripples inserted")
    })
}



// ASK Query execution only binds a boolean
function executeASKQuery(repo,queryPayload){
    repo.query(queryPayload).then((result)=>{
        console.log("The result of the ASK query is " + result)
    })
}


// Construct a simple SELECT Query that binds any statements
let selectQuery=new QueryHelper(QueryType.SELECT,"SELECT * WHERE {?a ?b ?c} LIMIT 10")
                .getPayload()
// Construct a simple ASK that return true 
let askQuery=new QueryHelper(QueryType.ASK,"ASK {?s ?p ?o}")
                .getPayload()
// Construct a simple DESCRIBE query 
let describeQuery=new QueryHelper(QueryType.DESCRIBE,"DESCRIBE <http://dbpedia.org/resource/Category:Corleonesi> LIMIT 10")
                .getPayload()
// Construct a simple CONSTRUCT query 
let constructQuery=new QueryHelper(QueryType.CONSTRUCT,
`PREFIX foaf:    <http://xmlns.com/foaf/0.1/>
PREFIX vcard:   <http://www.w3.org/2001/vcard-rdf/3.0#>
CONSTRUCT   { <http://example.org/person#Alice> vcard:FN ?name }
WHERE       { ?x foaf:name ?name }`).getPayload()


let insertQuery=new QueryHelper("Update",
`PREFIX foaf:    <http://xmlns.com/foaf/0.1/>
PREFIX vcard:   <http://www.w3.org/2001/vcard-rdf/3.0#>
INSERT DATA  { <http://example.org/person#Alice> vcard:FN foaf:bob }`).getPayload()



function executeSelect(){
    executeStreamedQuery(repository,selectQuery)
}

function executeASK(){
    executeASKQuery(repository,askQuery)
}

function executeDescribe(){
    executeStreamedQuery(repository,describeQuery)
}

function executeConstruct(){
    executeStreamedQuery(repository,constructQuery)
}

function executeInsert(){
    executeInsertQuery(repository,constructQuery)
}


module.exports ={executeASK,executeSelect,executeDescribe,executeConstruct,executeInsert}

