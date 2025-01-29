const { MongoClient } = require('mongodb');

async function run() {
    // Connection URL
    const url = 'mongodb://localhost:27017'; // Change this if your MongoDB server is hosted elsewhere
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database
        const database = client.db('yourDatabaseName'); // Replace with your database name
        const products = database.collection('products');

        // Query to find products in Electronics category with price > 500
        const query = { category: "Electronics", price: { $gt: 500 } };
        const options = { sort: { price: -1 } };

        const results = await products.find(query, options).toArray();

        // Print the results
        console.log(results);
    } catch (error) {
        console.error('Error connecting to the database or running the query:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

run().catch(console.error);