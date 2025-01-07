const {model, Schema, SchemaTypes,connect, disconnect} = require('mongoose');

const schema = new Schema({
  variant_id: { type: SchemaTypes.String, required: true, unique: true },
  variant_name: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String, required: true },
  slug: { type: SchemaTypes.String, required: true, unique: true },
  car_id: { type: SchemaTypes.String, required: true },
  exshowroom_price: { type: SchemaTypes.String, required: true },
  specification:{type:SchemaTypes.Mixed,required:false}
});

const dbModel = model('carvariants', schema);
const MONGO_URI = 'mongodb+srv://amantyagi2223:admin123@cluster0.k0xonxj.mongodb.net/dev_carservice'; // Replace with your MongoDB URI


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