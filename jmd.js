const {model, Schema, SchemaTypes,connect, disconnect} = require('mongoose');
const fs = require('fs');

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://amantyagi2223:admin123@cluster0.k0xonxj.mongodb.net/dev_carservice'; // Replace with your MongoDB URI


const schema = new Schema(
  {
    car_id: { type: SchemaTypes.String, required: true, unique: true },
    car_name: { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, required: true },
    slug: { type: SchemaTypes.String, required: true, unique: true },
    brand_id: {
      type: SchemaTypes.String,
      ref: 'Brand',
      required: true,
    },
    body_type_id: {
      type: SchemaTypes.String,
      ref: 'bodyTypes',
      required: true,
    },
    images: {
      type: [
        {
          path: { type: SchemaTypes.String },
          title: { type: SchemaTypes.String },
        },
      ],
      required: true,
    },
    link: { type: SchemaTypes.String, required: true },
    upcomming: { type: SchemaTypes.Boolean, required: true, default: false },
    recommended: { type: SchemaTypes.Boolean, required: true, default: false },
    popular: { type: SchemaTypes.Boolean, required: true, default: false },
    latest: { type: SchemaTypes.Boolean, required: true, default: true },
    top_selling: { type: SchemaTypes.Boolean, required: true, default: false },
    is_published: { type: SchemaTypes.Boolean, default: false },
    is_deleted: { type: SchemaTypes.Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

const dbModel = model('cars', schema);


async function loadData(data) {
  try {
    // Connect to MongoDB
    await connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert data into the database
    const result = await dbModel.insertMany(data);
    console.log(`${result.length} data have been successfully added.`);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    // Close the database connection
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

module.exports = {loadData}
