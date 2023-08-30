const grpc= require('grpc')
//protoLoader compiles your proto file in js chunks which contains your schema
//here actually the compiler name is ProtoJs
const protoLoader= require('@grpc/proto-Loader')
//packageDef loads the schema from our protofile gives it a default namespace
const packageDef=protoLoader.loadSync("todo.proto",{})
//convert the TodoPackage to grpcObject 
const grpcObject=grpc.loadPackageDefinition(packageDef)

const todoPackage= grpcObject.todoPackage
//to create a client specify the service with params such as port and security details
const client = new todoPackage.Todo("localhost:40000",grpc.credentials.createInsecure())
const text =process.argv[2]

client.createTodo({
    "id":2,
    // "text":"Do Laundry"
    "text":text
},(err,response)=>{
    // console.log(response)
    console.log(`received from the server:\n${JSON.stringify(response)}`)
})
