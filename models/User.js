const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: 'User Name is Required',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is Required',
    match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// get total count of friends retrieval
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;