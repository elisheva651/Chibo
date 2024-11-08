import clientPromise from '../../lib/mongodb';

export default async function plantsData(req, res) {
  const {difficulty } = req.query;  // Get difficulty from the query string

  try {
    const client = await clientPromise;
    const db = client.db('Plants');
    const plantsCollection = db.collection('plants');
    
    // const query = {};
    
    
    // if (difficulty) {
    //   query.difficulty = difficulty;  // Filter by difficulty level if provided
    // }
    // else{
    //   console.log("no difficulty settings")
    // }
    const plants = await plantsCollection.find({difficulty:difficulty}, { readPreference: 'primary' }).toArray();

    // const plants = await plantsCollection.find(query).toArray();
    // console.log("plants", plants)
    // if (!plants || plants.length === 0) {
    //   return res.status(404).json({ message: 'No plants found for the selected difficulty' });
    // }
    // const plantNames = plants.map((plant) => ({
    //   _id: plant._id,
    //   name: plant.name,  // Assuming plant document has a "name" field
    // }));
    // console.log("plantNames", plantNames)
    res.status(200).json(plants);  // Return filtered plant data
  } catch (error) {
    if (error.name === 'MongoError') {
      // Specific MongoDB-related error handling
      res.status(500).json({ message: 'Database error occurred', error: error.message });
    } else {
      // General error handling
      res.status(500).json({ message: 'Unknown error occurred', error: error.message });
    }
  }
}