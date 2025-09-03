const { MongoClient, ServerApiVersion } = require('mongodb');

if(!process.env.MONGODB_URL){
  throw new Error("Mongo URL not found")
}

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getDatabase(bdName) {
  try {
    console.log("Connecting to DB...")
    await client.connect();
    console.log("Connected to DB...")
    return client.db(bdName)
  }catch(err){
    console.log("error",err)
  }}

  export async function getCollection(collectionName) {
    const db=await getDatabase('news_app');
    if(db){
      return db.collection(collectionName);
    }
    return null;
  }