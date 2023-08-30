const grpc= require('grpc')
//protoLoader compiles your proto file in js chunks which contains your schema
//here actually the compiler name is ProtoJs
const protoLoader= require('@grpc/proto-Loader')
//packageDef loads the schema from our protofile gives it a default namespace
const packageDef=protoLoader.loadSync("todo.proto",{})
//convert the TodoPackage to grpcObject 
const grpcObject=grpc.loadPackageDefinition(packageDef)

const todoPackage= grpcObject.todoPackage
//now we can instanciate the service get access to the messages and all other stuff 

//create a new grpc server
const server = new grpc.Server()
//bind this server to a particular port or something like that 
server.bind('0.0.0.0:40000',grpc.ServerCredentials.createInsecure())
//now this server has no idea about what service we are providing
//so add service
//then we have to map the methods provided in the service to something that is in this file
//then map with key as the original method name as in the schmea with its value as function name
//defined in this file
server.addService(todoPackage.Todo.service,{
"createTodo":createTodo,
"readTodos":readTodos,
"readTodosStream":readTodosStream
})

//now start communicating with the server 
server.start()

const todos=[]
function createTodo(call, callback){
    const todoItem={
        "id":todos.length+1,
        "text":call.request.text
    }
    todos.push(todoItem)
    //server is done , now we have to call the client to  say that the sever is done by using callback function
    //callback(length_payload:default(null),todoItem)// payload length will be autocalculated if null is provided 
    console.log(call)
    callback(null,todoItem)
}
function readTodos(call,callback){
    console.log(call)
    callback(null,{"items":todos})
}

function readTodosStream(call,callback){
    //a way for streaming to the clients
    todos.forEach(t=>call.write(t));
    call.end();
}