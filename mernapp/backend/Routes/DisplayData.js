const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
  try {
    if (global.sample && global.sample.length > 0) {
        res.status(200).send({
            sample: global.sample,
            foodCategory: global.foodCategory
          });
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;


