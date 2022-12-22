
const dynamoose = require('dynamoose');


const componentSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});


module.exports = dynamoose.model(
  'dev-media-akshit',
  componentSchema,
);

