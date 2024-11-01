// pages/api/data.js
export default function app_statics(req, res) {
    const { method, query } = req;
  
    // Define static arrays
    const categories = [{'יסודות':'Bases'}, {'נקודות דיקור':'Acupuncture_points'}, {'צמחים':'plants'}, {'רפואה מערבית':'western_medicine'}]
    const ways_to_learn =[{'הרצאות':'Lectures'}, {'סיכומים':'Summaries'}, {'משחקים':'Games'}, {'תרגילים':'Exercises'}];
    

    // Example of accessing different data sets
    switch (query.type) {
      case 'ways_to_learn':
        res.status(200).json(ways_to_learn);
        break;
      case 'categories':
        res.status(200).json(categories);
        break;
      default:
        res.status(400).json({ message: 'Invalid type' });
        break;
    }
  }
  