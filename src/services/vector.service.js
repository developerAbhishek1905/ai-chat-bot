// Import Pinecone
const { Pinecone } = require('@pinecone-database/pinecone')

// Initialize client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})

// Attach to index (need index host URL!)
const myGptIndex = pc.index(
  'my-gpt',
  'https://my-gpt-x7lwoww.svc.aped-4627-b74a.pinecone.io' // get this from Pinecone console
)

// Upsert (save memory)
async function createMemory({ vectors, metadata, messageId }) {
  if (!vectors || !Array.isArray(vectors)) {
    throw new Error('Vectors must be a float array')
  }

  await myGptIndex.upsert([
    {
      id: messageId,
      values: vectors,
      metadata,
    },
  ])
}

// Query memory
async function queryMemory({ queryVector, limit = 5, metadata }) {
  if (!queryVector || !Array.isArray(queryVector)) {
    throw new Error('queryVector must be a float array')
  }

  const queryOptions = {
    vector: queryVector,
    topK: limit,
    includeMetadata: true,
  }

  if (metadata && Object.keys(metadata).length > 0) {
    queryOptions.filter = metadata
  }

  const data = await myGptIndex.query(queryOptions)
  return data.matches
}

module.exports = { createMemory, queryMemory }
