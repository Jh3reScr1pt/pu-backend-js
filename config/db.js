import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://jhere2406:54321@cluster0.afdlmpe.mongodb.net/delivery-u').then(()=>console.log("Base de datos de Pedidos U conectada"))
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.