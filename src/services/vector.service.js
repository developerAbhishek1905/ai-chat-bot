// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});

// Create a dense index with integrated embedding
const myGptIndex = pc.index('my-gpt')
async function  createMomory({vectors, metadata, massageId}) {

    await myGptIndex.upsert([{
        id:massageId,
        values:vectors,
        metadata
        
    }])
}
async function queryMemory ({queryVector, limit=5,metadata}){
    const data = await myGptIndex.query({
        vector: queryVector,
        topK:limit,
        filter: metadata ? {metadata}:undefined,
        includeMetadata: true
    })

    return data.matches
}

module.exports = {createMomory,queryMemory}