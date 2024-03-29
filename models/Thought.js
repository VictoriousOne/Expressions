const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: 'Reaction is Required',
    max: 280
  },
  userName: {
    type: String,
    required: 'User Name is Required'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  }
},
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought is Required',
    min: 1,
    max: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  userName: {
    type: String,
    unique: false,
    required: 'User Name is Required'
  },
  reactions: [reactionSchema]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of friends retrieval
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;