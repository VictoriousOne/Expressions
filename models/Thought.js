const { Schema, model} = require('mongoose');

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
      },
      userName: {
        type: String,
        unique: true,
        required: 'User Name is Required',
        trim: true
    },
    reactions: [reactionsSchema]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// get total count of friends retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;