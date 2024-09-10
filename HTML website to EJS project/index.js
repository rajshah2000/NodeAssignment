const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer')
const app = express();

// Connection URL 
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'ecommercedb';

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname.split('.')
    const imgextension = name[1]
    const uniqueSuffix = Date.now() +imgextension
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


let db;

// Connect to MongoDB
const main = async () => {
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
}
main();

app.get("/", (req, res) => {
  res.render("Home");
});

// Display categories and form for adding a new category
app.get("/category", async (req, res) => {
  const collection = db.collection('categorytbl');
  let catData = await collection.find().toArray();
  res.render('category', { 'allcat': catData, 'editcat': null });  // 'editcat' is null when adding a new category
});

// Insert or update category
app.post("/category",upload.single('image') ,async (req, res) => {
  const { catid, catname } = req.body;
  const imagename = req.file.filename
  const collection = db.collection('categorytbl');
  
  if (catid) {
    // Update existing category
    const id = new ObjectId(catid);
    await collection.updateOne({ _id: id }, { $set: { name: catname } });
  } else {
    // Insert new category
    await collection.insertOne({ name: catname, image: imagename });
  }
  
  res.redirect('/category');
});

// Delete category
app.get("/deleteCat/:id", async (req, res) => {
  const id = req.params.id;
  const collection = db.collection('categorytbl');
  const objId = new ObjectId(id);
  
  await collection.deleteOne({ _id: objId });
  res.redirect('/category');
});

// Edit category
app.get("/editcat/:id", async (req, res) => {
  const id = req.params.id;
  const collection = db.collection('categorytbl');
  const objId = new ObjectId(id);
  const result = await collection.findOne({ _id: objId });
  let catData = await collection.find().toArray();
  
  res.render('category', {
    'editcat': result || null,  // Set 'editcat' to the found category or null
    'allcat': catData
  });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
