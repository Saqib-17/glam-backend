import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin:[
    "http://localhost:5173",
    "https://glam-frontend-silk.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB URI and Client
const uri = "mongodb+srv://ankushbiswash7:FfuspkpSam7Lc0Ki@cluster1.esas4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create MongoClient with options for MongoDB server API compatibility
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    // await client.connect();
    console.log("Connected to MongoDB");

    // Reference to the `products` collection
    const productCollection = client.db("GlamKey").collection("products");
    const categoryCollection = client.db("GlamKey").collection("category");
    const trendingOffersCollection = client.db("GlamKey").collection("trendingOffers");
    const jewelleryGuidesCollection = client.db("GlamKey").collection("jewelleryGuides");

    // Route to fetch all products
    app.get('/products', async(req, res)=>{
        const result = await productCollection.find().toArray()
        res.send(result)
    })

    // Route to fetch all category
    app.get('/category', async(req, res)=>{
        const result = await categoryCollection.find().toArray()
        res.send(result)
    })

    // Route to fetch all trending offers
    app.get('/trendingOffers', async(req, res)=>{
        const result = await trendingOffersCollection.find().toArray()
        res.send(result)
    })

    // Route to fetch all jewellery guides
    app.get('/jewelleryGuides', async(req, res)=>{
        const result = await jewelleryGuidesCollection.find().toArray()
        res.send(result)
    })

    // Ping the database
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}

run().catch(console.error);

// Root Route
app.get("/", (req, res) => {
  res.send("GlamKey Server is running");
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
