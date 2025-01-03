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
    console.log("Connected to MongoDB");

    // Reference to collections
    const usersCollection = client.db("GlamKey").collection("users");

    // Route to add a new user
    app.post('/users', async (req, res) => {
      const user = req.body; // Expecting { name, email, password } in the request body
      try {
        const result = await usersCollection.insertOne(user);
        res.status(201).send({ message: "User created successfully", result });
      } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).send({ message: "Failed to create user" });
      }
    });

    // Existing routes (products, category, etc.)
    const productCollection = client.db("GlamKey").collection("products");
    const categoryCollection = client.db("GlamKey").collection("category");
    const trendingOffersCollection = client.db("GlamKey").collection("trendingOffers");
    const jewelleryGuidesCollection = client.db("GlamKey").collection("jewelleryGuides");

    app.get('/products', async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });

    app.get('/category', async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    app.get('/trendingOffers', async (req, res) => {
      const result = await trendingOffersCollection.find().toArray();
      res.send(result);
    });

    app.get('/jewelleryGuides', async (req, res) => {
      const result = await jewelleryGuidesCollection.find().toArray();
      res.send(result);
    });

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
