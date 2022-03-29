const { Schema, Types } = require('mongoose');

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
    }
});

module.exports = reactionSchema;