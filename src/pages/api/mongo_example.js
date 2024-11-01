import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-db-name'); // Replace with your database name

  switch (req.method) {
    case 'GET':
      const data = await db.collection('your-collection-name').find({}).toArray(); // Replace with your collection name
      res.json(data);
      break;
    // Add other methods (POST, PUT, DELETE) as needed
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
