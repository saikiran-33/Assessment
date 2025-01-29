const { MongoClient } = require('mongodb');
async function run() {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    try {
        await client.connect();
        const database = client.db('db');
        const products = database.collection('products');
        const query = { category: "Electronics", price: { $gt: 500 } };
        const options = { sort: { price: -1 } };
        const results = await products.find(query, options).toArray();
        console.log(results);
    } catch (error) {
        console.error('Error connecting to the database or running the query:', error);
    } finally {
        await client.close();
    }
}
run().catch(console.error);
