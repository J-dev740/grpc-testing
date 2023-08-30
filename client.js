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
    // console.log(`received from the server:\n${JSON.stringify(response)}`)
})

// client.readTodos({},(err,response)=>{

//     // console.log(`received from the server(readTodos):\n${JSON.stringify(response.items)}`)
//     if(!response.items){
//         console.log("no items stack")
//         return 
//     }else{
//         response.items.forEach(element => {
//             console.log(element.text)
//         });

//     }

// })

const call=client.readTodosStream()
//when we receive data events from server
call.on("data",item=>{
    console.log(`received item from server(stream):\n${JSON.stringify(item.text)}`)
})
//when the sever will end communication it will fire an event named end
call.on("end",e=>console.log("server done!"))