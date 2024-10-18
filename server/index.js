const express = require('express')
const cors = require('cors');
const app = express();

const PORT = 5000

app.use(cors());
app.use(express.json()); 


const categories = ['יסודות', 'נקודות דיקור', 'צמחים', 'רפואה מערבית']
const ways_to_learn =['הרצאות', 'סיכומים', 'משחקים', 'תרגילים'];
// const categories = ['lectures'];

app.get('/api/ways_to_learn', (req, res) => {
    res.json(ways_to_learn);
    return res
  });


app.get('/api/categories', (req, res) => {
  res.json(categories);
  return res
});


app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})