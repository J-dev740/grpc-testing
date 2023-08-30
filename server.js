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
})

//now start communicating with the server 
server.start()
function createTodo(call, callback){
    console.log(call)
}
function readTodos(call,callback){
    console.log(call)
}