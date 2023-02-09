
const dynamoose = require('dynamoose');


const componentSchema = new dynamoose.Schema({
  key: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});


module.exports = dynamoose.model(
  'prod-media-status',
  componentSchema,
);

