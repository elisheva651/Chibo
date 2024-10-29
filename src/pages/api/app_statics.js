// pages/api/data.js
export default function app_statics(req, res) {
    const { method, query } = req;
  
    // Define static arrays
    const data1 = [
      { id: 1, name: 'Learn React' },
      { id: 2, name: 'Learn Next.js' },
      { id: 3, name: 'Learn JavaScript' },
    ];
  
    const data2 = [
      { id: 1, name: 'Study Math' },
      { id: 2, name: 'Study Science' },
    ];
  
    // Example of accessing different data sets
    switch (query.type) {
      case 'learning':
        res.status(200).json(data1);
        break;
      case 'studying':
        res.status(200).json(data2);
        break;
      default:
        res.status(400).json({ message: 'Invalid type' });
        break;
    }
  }
  