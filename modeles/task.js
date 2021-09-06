const { Schema,model } = require('mongoose')
const task = new Schema({
  title: {
    required: true,
    type: String
  },
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: String,
  comments: {
    comment: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        text:String,
        createdAt: Date
      }
    ]
  },
})
module.exports = model('Task', task)