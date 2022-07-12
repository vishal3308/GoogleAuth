// const {MongoClient}=require('mongodb')
// const client=new MongoClient('mongodb://localhost:27017');
// async function main(){
//     await client.connect();
//     console.log('Successfull')
//     const db=client.db('e-commerce');
//     return collection=db.collection('users')
// }

const mongoose=require('mongoose');
module.exports=mongoose.connect('mongodb://localhost:27017/e-commerce');