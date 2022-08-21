// const {MongoClient}=require('mongodb')
// const client=new MongoClient('mongodb://localhost:27017');
// async function main(){
//     await client.connect();
//     console.log('Successfull')
//     const db=client.db('e-commerce');
//     return collection=db.collection('users')
// }
const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
module.exports=mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch(err=>console.log(err.message));